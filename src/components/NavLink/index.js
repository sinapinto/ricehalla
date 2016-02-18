import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './NavLink.css';

const propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

function NavLink({ children, to, ...other }) {
  return (
    <Link {...other} to={to} className={styles.navLink}>
      {children}
    </Link>
  );
}

NavLink.propTypes = propTypes;

export default NavLink;
