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
    return (
      <div className={style.root} style={this.props.style}>
        <span className={this.state.checked ? style.checkboxChecked : style.checkbox}>
          {this.state.checked && <span className={style.check} />}
          <input
            className={style.input}
            id={this.props.id}
            type="checkbox"
            checked={this.state.checked}
            onChange={this.props.onChange}
          />
        </span>
        <label className={style.label} htmlFor={this.props.id}>
          {this.props.children}
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
  style: PropTypes.object,
};

Checkbox.defaultProps = {
  onChange: () => null,
  defaultChecked: true,
  id: 'checkbox',
};

export default Checkbox;
