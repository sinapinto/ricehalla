import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './NavLink.css';
import Button from '../Button';

const propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

function NavLink({ children, to, theme, ...other }) {
  return (
    <Link {...other} to={to} className={styles.navLink} tabIndex={-1}>
      <Button theme={theme}>
        {children}
      </Button>
    </Link>
  );
}

NavLink.propTypes = propTypes;

export default NavLink;
