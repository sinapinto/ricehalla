import React, { PropTypes } from 'react';
import styles from './Input.css';

const Input = ({ placeholder, icon, ...other }) => (
  <div className={styles.wrapper}>
    { icon && <i className={`fa ${icon}`}></i> }
    <input
      type="text"
      className={styles.input}
      placeholder={placeholder}
      {...other}
    />
  </div>
);

Input.propTypes = {
  placeholder: PropTypes.string,
  icon: PropTypes.string,
};

export default Input;
