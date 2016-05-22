import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './style.css';
import Button from '../Button';

function NavLink({ children, to, ...other }) {
  return (
    <Link to={to} className={style.navLink} tabIndex={-1}>
      <Button {...other}>
        {children}
      </Button>
    </Link>
  );
}

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavLink;
