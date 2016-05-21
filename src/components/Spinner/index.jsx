import React, { PropTypes } from 'react';
import style from './style.css';

function Spinner({ className, ...other }) {
  const classes = [style.spinner];
  if (className) {
    classes.push(className);
  }
  return (
    <div className={classes} {...other}>
      <div className={style.dotOne} />
      <div className={style.dotTwo} />
      <div className={style.dotThree} />
    </div>
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
