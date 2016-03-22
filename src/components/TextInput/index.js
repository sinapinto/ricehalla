import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  type: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
};

function TextInput({ type = 'text', valid, invalid, ...other }) {
  let classes = `${styles.input} `;
  if (valid) {
    classes += `${styles.valid} `;
  } else if (invalid) {
    classes += `${styles.invalid} `;
  }

  return (
    <input
      {...other}
      className={classes}
      type={type}
    />
  );
}

TextInput.propTypes = propTypes;

export default TextInput;
