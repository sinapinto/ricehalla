import React, { Component, PropTypes } from 'react';
import style from './style.css';

class Checkbox extends Component{
  constructor(props) {
    super(props);
    let checked;
    if ('checked' in props) {
      checked = props.checked;
    } else {
      checked = props.defaultChecked;
    }
    this.state = {
      checked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({ checked: nextProps.checked });
    }
  }

  render() {
    const { onChange, defaultChecked, checked, disabled, id, children, ...other } = this.props;
    const boxClasses = [style.box];
    const checkClasses = [style.check];
    if (this.state.checked) {
      boxClasses.push(style.boxChecked);
    }
    if (disabled) {
      checkClasses.push(style.checkDisabled);
      boxClasses.push(style.boxDisabled);
    }
    return (
      <div {...other}>
        <span className={boxClasses.join(' ')}>
          {this.state.checked && <span className={checkClasses.join(' ')} />}
          <input
            disabled={disabled}
            className={style.input}
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
          />
        </span>
        <label className={style.label} htmlFor={id}>
          {children}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  children: PropTypes.string,
};

Checkbox.defaultProps = {
  onChange: () => null,
  defaultChecked: true,
  id: 'checkbox',
};

export default Checkbox;
