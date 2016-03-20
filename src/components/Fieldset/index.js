import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.node,
  legend: PropTypes.node,
};

function Fieldset({ children, legend }) {
  return (
    <div className={styles.fieldset}>
      <div className={styles.legend}>{legend}</div>
      <div className={styles.fields}>
        {children}
      </div>
    </div>
  );
}

Fieldset.propTypes = propTypes;

export default Fieldset;
