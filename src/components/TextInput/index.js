import React, { Component, PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'email']),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(e) {
    this.props.onChange(this.props.id, e.target.value);
  }

  render() {
    const {
      type = 'text',
      placeholder,
      value,
      id,
      disabled,
      required,
      autoFocus,
      ...rest
    } = this.props;

    return (
      <input
        {...rest}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={this.changeValue}
        id={id}
        disabled={!!disabled}
        required={!!required}
        autoFocus={!!autoFocus}
      />
    );
  }
}

TextInput.propTypes = propTypes;

export default TextInput;
