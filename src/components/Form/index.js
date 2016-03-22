import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.node.isRequired,
};

function Form({ children, ...other }) {
  return (
    <form className={styles.form} {...other}>
      {children}
    </form>
  );
}

Form.propTypes = propTypes;

export default Form;
