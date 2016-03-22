import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['normal', 'primary', 'success', 'error']),
  disabled: PropTypes.bool,
  width: PropTypes.string,
};

const themes = {
  normal: styles.btnNormal,
  primary: styles.btnPrimary,
  success: styles.btnSuccess,
  error: styles.btnError,
};

function Button({ theme = 'normal', width, disabled, children, ...other }) {
  return (
    <button
      {...other}
      type="submit"
      className={themes[theme]}
      style={width ? { width } : null }
      disabled={!!disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = propTypes;

export default Button;
