import React, { PropTypes } from 'react';
import styles from './Button.css';

const themes = {
  normal: styles.btnNormal,
  primary: styles.btnPrimary,
  success: styles.btnSuccess,
  error: styles.btnError,
};

const Button = ({ handleClick, theme = 'normal', children, ...other }) => (
  <button {...other}
    type="submit"
    className={themes[theme]}
    onClick={handleClick}
  >
    {children}
  </button>
);

export default Button;

Button.propTypes = {
  theme: PropTypes.oneOf(['normal', 'primary', 'success', 'error']),
  children: PropTypes.string.isRequired,
};
