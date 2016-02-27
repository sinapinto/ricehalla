import React, { PropTypes } from 'react';
import styles from './Card.css';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

function Card({ children, ...other }) {
  return (
    <div {...other} className={styles.card}>
      {children}
    </div>
  );
}

Card.propTypes = propTypes;

export default Card;
