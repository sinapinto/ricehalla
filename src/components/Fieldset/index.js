import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.node,
};

function Fieldset({ children }) {
  return (
    <div className={styles.fieldset}>
      <div className={styles.fields}>
        {children}
      </div>
    </div>
  );
}

Fieldset.propTypes = propTypes;

export default Fieldset;
