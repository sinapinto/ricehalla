import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
};

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
    </label>
  );
}

Label.propTypes = propTypes;

export default Label;
