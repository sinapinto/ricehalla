import React, { PropTypes } from 'react';
import styles from './Button.css';

const Button = ({ handleClick, children, ...other }) => (
  <button {...other}
    type="submit"
    className={styles.btnDefault}
    onClick={handleClick}
  >
    {children}
  </button>
);

export default Button;

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
