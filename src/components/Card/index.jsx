import React, { PropTypes } from 'react';
import style from './style.css';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

function Card({ children, ...other }) {
  return (
    <div {...other} className={style.card}>
      {children}
    </div>
  );
}

Card.propTypes = propTypes;

export default Card;
