import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string,
};

function Checkbox({ id, children, ...other }) {
  return (
    <div className={styles.root}>
      <input
        {...other}
        className={styles.checkbox}
        id={id}
        type="checkbox"
      />
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
    </div>
  );
}

Checkbox.propTypes = propTypes;

export default Checkbox;
