import React, { PropTypes } from 'react';
import styles from './ContainerBox.css';

const propTypes = {
  children: PropTypes.any.isRequired,
};

function ContainerBox({ children, ...other }) {
  return (
    <div {...other} className={styles.box}>
      {children}
    </div>
  );
}

ContainerBox.propTypes = propTypes;

export default ContainerBox;

