import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
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
    const { isOpen, children, onClose } = this.props;
    return (
      <div className={styles.container}>
        { isOpen &&
          <div className={styles.popover} ref="popover">
            { children.map((item, i) => {
              return <div className={styles.item} key={i}>
                <span onClick={this._close}>{item}</span>
              </div>;
            }) }
          </div>
        }
      </div>
    );
  }
}

Popover.propTypes = propTypes;

export default Popover;
