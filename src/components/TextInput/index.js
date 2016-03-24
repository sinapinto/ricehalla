import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  type: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
};

function TextInput({ type = 'text', valid, invalid, ...other }) {
  const classes = [styles.input];
  if (valid) {
    classes.push(styles.valid);
  } else if (invalid) {
    classes.push(styles.invalid);
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
