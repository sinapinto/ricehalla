import React, { PropTypes } from 'react';
import style from './style.css';

const propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

function Icon({ name, size = 24, className } = {}) {
  const classes = [style.icon];
  if (className) {
    classes.push(className);
  }
  const props = {
    width: size,
    height: size,
    className: classes.join(' '),
    xmlns: 'http://www.w3.org/2000/svg',
  };
  switch (name) {
    case 'alert-circle':
      return <svg {...props} viewBox="0 0 24 24"><path d="M13 17h-2v-2h2v2zm0-4h-2V7h2v6z"/><path d="M12 4c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8m0-2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/></svg>;
    case 'upload':
      return <svg {...props} viewBox="0 0 20 20"><path d="M8 12h4V6h3l-5-5-5 5h3v6zm11.338 1.532c-.21-.224-1.611-1.723-2.011-2.114A1.503 1.503 0 0 0 16.285 11h-1.757l3.064 2.994h-3.544a.274.274 0 0 0-.24.133L12.992 16H7.008l-.816-1.873a.276.276 0 0 0-.24-.133H2.408L5.471 11H3.715c-.397 0-.776.159-1.042.418-.4.392-1.801 1.891-2.011 2.114-.489.521-.758.936-.63 1.449l.561 3.074c.128.514.691.936 1.252.936h16.312c.561 0 1.124-.422 1.252-.936l.561-3.074c.126-.513-.142-.928-.632-1.449z"/></svg>;
    case 'upload-to-cloud':
      return <svg {...props} viewBox="0 0 20 20"><path d="M15.213 6.639c-.276 0-.546.025-.809.068C13.748 4.562 11.716 3 9.309 3c-2.939 0-5.32 2.328-5.32 5.199 0 .256.02.508.057.756a3.567 3.567 0 0 0-.429-.027C1.619 8.928 0 10.51 0 12.463S1.619 16 3.617 16H8v-4H5.5L10 7l4.5 5H12v4h3.213C17.856 16 20 13.904 20 11.32c0-2.586-2.144-4.681-4.787-4.681z"/></svg>;
    default:
      return null;
  };
}

Icon.propTypes = propTypes;

export default Icon;
