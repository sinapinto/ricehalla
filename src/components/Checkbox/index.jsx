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
    const { onChange, defaultChecked, checked, id, children, ...other } = this.props;
    return (
      <div {...other}>
        <span className={this.state.checked ? style.checkboxChecked : style.checkbox}>
          {this.state.checked && <span className={style.check} />}
          <input
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
  id: PropTypes.string,
  children: PropTypes.string,
};

Checkbox.defaultProps = {
  onChange: () => null,
  defaultChecked: true,
  id: 'checkbox',
};

export default Checkbox;
