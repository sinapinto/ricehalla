import React, { PropTypes } from 'react';
import style from './style.css';

function Spinner({ className, ...other }) {
  const classes = [style.spinner];
  if (className) {
    classes.push(className);
  }
  return (
    <div className={classes} {...other}>
      <span className={style.dot} />
      <span className={style.dot} />
      <span className={style.dot} />
    </div>
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
