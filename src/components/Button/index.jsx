import React, { PropTypes } from 'react';
import style from './style.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,

  // mutually exclusive
  primary: PropTypes.bool,
  success: PropTypes.bool,
  danger: PropTypes.bool,

  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  bold: PropTypes.bool,
};

function Button({
  children,
  className,
  primary,
  success,
  danger,
  outline,
  disabled,
  bold,
  ...other
}) {
  const classes = [style.btn];
  if (primary) {
    classes.push(style.primary);
  } else if (success) {
    classes.push(style.success);
  } else if (danger) {
    classes.push(style.danger);
  }
  if (outline && !disabled) {
    classes.push(style.outline);
  }
  if (className) {
    classes.push(className);
  }
  if (bold) {
    classes.push(style.bold);
  }
  return (
    <button
      {...other}
      type="submit"
      className={classes.join(' ')}
      disabled={!!disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = propTypes;

export default Button;
