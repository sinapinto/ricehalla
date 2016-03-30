import React, { PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

function Icon({ icon, size = 24, className }) {
  if (icon === 'alert-circle') {
    return <svg className={[className, styles.lower].join(' ')} height={size} width={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 17h-2v-2h2v2zm0-4h-2V7h2v6z"/><path d="M12 4c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8m0-2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/></svg>;
  }
  return null;
}

Icon.propTypes = propTypes;

export default Icon;
