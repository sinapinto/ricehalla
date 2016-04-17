import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './style.css';
import Button from '../Button';

const propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

function NavLink({ children, to, ...other }) {
  return (
    <Link to={to} className={style.navLink} tabIndex={-1} onClick={e => { e.target.blur(); }}>
      <Button {...other} >
        {children}
      </Button>
    </Link>
  );
}

NavLink.propTypes = propTypes;

export default NavLink;
