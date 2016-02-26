import React, { PropTypes } from 'react';
import styles from './Button.css';

const propTypes = {
  theme: PropTypes.oneOf(['normal', 'primary', 'success', 'error']),
  children: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

const themes = {
  normal: styles.btnNormal,
  primary: styles.btnPrimary,
  success: styles.btnSuccess,
  error: styles.btnError,
};

function Button({ handleClick, theme = 'normal', children, ...other }) {
  return (
    <button {...other}
      type="submit"
      className={themes[theme]}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = propTypes;

export default Button;
