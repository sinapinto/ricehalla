import React, { Component, PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'password', 'email']),
  value: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
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
    const name = this.props.id || this.props.name;
    const value = e.target.value || '';
    this.props.onChange(name, value);
  }

  render() {
    const {
      type = 'text',
      value,
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
        value={value}
        onChange={this.changeValue}
        disabled={!!disabled}
        required={!!required}
        autoFocus={!!autoFocus}
      />
    );
  }
}

TextInput.propTypes = propTypes;

export default TextInput;
