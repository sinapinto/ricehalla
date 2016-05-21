import React, { PropTypes } from 'react';
import style from './style.css';

function Card({ children, ...other }) {
  return (
    <div {...other} className={style.card}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default Card;
