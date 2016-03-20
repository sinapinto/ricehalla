import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['normal', 'grey', 'primary', 'success', 'error']),
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  width: PropTypes.string,
};

const themes = {
  normal: styles.btnNormal,
  grey: styles.btnGrey,
  primary: styles.btnPrimary,
  success: styles.btnSuccess,
  error: styles.btnError,
};

const noop = () => {};

function Button({ handleClick, theme = 'normal', width, disabled, children }) {
  return (
    <button
      type="submit"
      className={themes[theme]}
      style={width ? { width } : null }
      disabled={!!disabled}
      onClick={handleClick || noop}
    >
      {children}
    </button>
  );
}

Button.propTypes = propTypes;

export default Button;
