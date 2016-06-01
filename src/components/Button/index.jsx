import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './style.css';

function Button({
  to,
  large,
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
  const button = (
    <button
      style={large ? {padding: '1.4em 5em', height: '55px'} : {}}
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
  if (to) {
    return <Link to={to} className={style.link} tabIndex={-1}>{button}</Link>;
  }
  return button;
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
