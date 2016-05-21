import React, { PropTypes } from 'react';
import style from './style.css';

function Checkbox({ id, children, ...other }) {
  return (
    <div className={style.root}>
      <input
        {...other}
        className={style.checkbox}
        id={id}
        type="checkbox"
      />
      <label className={style.label} htmlFor={id}>
        {children}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string,
};

export default Checkbox;
