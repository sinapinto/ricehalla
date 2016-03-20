import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

function FormCard({ children }) {
  return (
    <div className={styles.formCard}>
      {children}
    </div>
  );
}

FormCard.propTypes = propTypes;

export default FormCard;
