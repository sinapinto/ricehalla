import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['normal', 'primary', 'success', 'error']),
  disabled: PropTypes.bool,
};

const defaultProps = {
  theme: 'normal',
  disabled: false,
};

function Button({ theme, disabled, className, children, ...other }) {
  const themes = {
    normal: styles.btnNormal,
    primary: styles.btnPrimary,
    success: styles.btnSuccess,
    error: styles.btnError,
  };

  return (
    <button
      {...other}
      type="submit"
      className={[themes[theme], className].join(' ')}
      disabled={!!disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
