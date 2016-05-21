import React, { PropTypes } from 'react';
import style from './style.css';

function TextInput({ type = 'text', valid, invalid, className, multiline, height, ...other }) {
  const classes = [style.input];
  if (invalid) {
    classes.push(style.invalid);
  } else if (valid) {
    classes.push(style.valid);
  }

  if (className) {
    classes.push(className);
  }

  if (multiline) {
    return (
      <textarea
        {...other}
        className={classes.join(' ')}
        style={{ height: height || 80 }}
      />
    );
  }

  return (
    <input
      {...other}
      className={classes.join(' ')}
      style={{ height: height || 40 }}
      type={type}
    />
  );
}

TextInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  multiline: PropTypes.bool,
};

export default TextInput;
