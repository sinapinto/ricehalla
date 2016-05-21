import React, { PropTypes } from 'react';
import style from './style.css';

function Button({
  children,
  className,
  primary,
  success,
  danger,
  outline,
  disabled,
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
  return (
    <button
      {...other}
      type="submit"
      className={classes.join(' ')}
      disabled={!!disabled}
    >
      <div className={style.children}>
        {children}
      </div>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  primary: PropTypes.bool,
  success: PropTypes.bool,
  danger: PropTypes.bool,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
