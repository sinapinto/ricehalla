import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  text: PropTypes.string,
  htmlFor: PropTypes.string,
};

function Label({ text, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {text}
    </label>
  );
}

Label.propTypes = propTypes;

export default Label;
