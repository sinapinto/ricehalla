import React, { Component, PropTypes } from 'react';
import style from './style.css';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  isOpen: false,
};

class Popover extends Component {
  constructor() {
    super();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this._close = this._close.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      // use a delay so the opening click doesn't trigger
      this.timeout = setTimeout(() => {
        window.addEventListener('click', this.handleClickOutside);
      }, 100);
    }
  }

  componentWillUnmount() {
    this.cleanup();
  }

  handleClickOutside(e) {
    const el = this.refs.popover;
    if (el && !el.contains(e.target)) {
      this._close(e);
    }
  }

  _close(e) {
    this.cleanup();
    this.props.onClose(e);
  }

  cleanup() {
    clearTimeout(this.timeout);
    window.removeEventListener('click', this.handleClickOutside);
  }

  render() {
    const { isOpen, className, children, ...other } = this.props;
    const classes = [style.container];
    if (className) {
      classes.push(className);
    }
    return (
      <div className={classes.join(' ')} {...other}>
        {isOpen &&
          <div className={style.popover} ref="popover">
            <span className={style.tip} />
            {children.map((item, i) =>
              (<div onClick={this._close} className={style.itemWrapper} key={i}>
                <span className={style.item}>{item}</span>
              </div>)
            )}
          </div>
        }
      </div>
    );
  }
}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
