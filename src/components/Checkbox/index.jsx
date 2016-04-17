import React, { PropTypes } from 'react';
import style from './style.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string,
};

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

Checkbox.propTypes = propTypes;

export default Checkbox;
