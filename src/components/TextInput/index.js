import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
};

function TextInput({ type = 'text', valid, invalid, className, ...other }) {
  const classes = [styles.input];
  if (valid) {
    classes.push(styles.valid);
  } else if (invalid) {
    classes.push(styles.invalid);
  }

  if (className) {
    classes.push(className);
  }

  return (
    <input
      {...other}
      className={classes.join(' ')}
      type={type}
    />
  );
}

TextInput.propTypes = propTypes;

export default TextInput;
