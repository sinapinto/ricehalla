import React, { PropTypes } from 'react';
import style from './style.css';

function Label({ children, className, htmlFor }) {
  const classes = [style.label];
  if (className) {
    classes.push(className);
  }
  return (
    <label htmlFor={htmlFor} className={classes.join(' ')}>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default Label;
