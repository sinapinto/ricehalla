import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function Form({ children, className, ...other }) {
  const classes = [styles.form];
  if (className) {
    classes.push(className);
  }
  return (
    <form
      method="post"
      className={classes.join(' ')}
      {...other}
    >
      {children}
    </form>
  );
}

Form.propTypes = propTypes;

export default Form;
