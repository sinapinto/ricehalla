import React, { PropTypes } from 'react';
import styles from './styles.css';

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
  const classes = [styles.btn];
  if (primary) {
    classes.push(styles.primary);
  } else if (success) {
    classes.push(styles.success);
  } else if (danger) {
    classes.push(styles.danger);
  }
  if (outline) {
    classes.push(styles.outline);
  }
  if (className) {
    classes.push(className);
  }
  if (bold) {
    classes.push(styles.bold);
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
