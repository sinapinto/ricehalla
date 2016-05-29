import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';
import style from './style.css';

const classes = {
  error: style.error,
  info: style.info,
  warn: style.warn,
  success: style.success,
};

const icons = {
  error: 'close-circled',
  info: 'information-circled',
  warn: 'alert-circled',
  success: 'checkmark-circled',
};

class Notice extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClose();
  }

  render() {
    return (
      <div className={classes[this.props.level]}>
        <Icon name={icons[this.props.level]} size={15} className={style.icon} />
        <span>{this.props.message}</span>
        <Icon name="close" size={22} className={style.close} onClick={this.handleClick} />
      </div>
    );
  }
}

Notice.propTypes = {
  message: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['error', 'info', 'warn', 'success']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notice;
