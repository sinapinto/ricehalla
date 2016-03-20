import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  label: PropTypes.node,
  input: PropTypes.node,
};

function Field({ label, input }) {
  return (
    <div className={styles.field}>
      <div className={styles.label}>
        {label}
      </div>
      <div className={styles.input}>
        {input}
      </div>
    </div>
  );
}

Field.propTypes = propTypes;

export default Field;
