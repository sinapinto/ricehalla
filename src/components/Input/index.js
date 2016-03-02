import React, { PropTypes } from 'react';
import styles from './Input.css';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

function Input({ children, ...other }) {
  return (
    <input {...other} className={styles.input}>
      {children}
    </input>
  );
}

Input.propTypes = propTypes;

export default Input;
