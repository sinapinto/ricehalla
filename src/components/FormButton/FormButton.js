import React, { PropTypes } from 'react';
import styles from './FormButton.css';

const FormButton = ({ handleClick, children, ...other }) => (
  <button {...other}
    type="submit"
    className={styles.btnDefault}
    onClick={handleClick}
  >
    {children}
  </button>
);

export default FormButton;

FormButton.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.string.isRequired,
};

