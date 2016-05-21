import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Icon from '../../components/Icon';
import style from './style.css';

function NotFound({ title, children, ...other }) {
  return (
    <div className={style.root} {...other}>
      <Helmet title={title} />
      <Icon name="sad-outline" size={180} className={style.sadIcon} />
      <div className={style.wrapper}>
        {children}
      </div>
    </div>
  );
}

NotFound.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

NotFound.defaultProps = {
  title: 'Not found',
};

function H1({ children, ...other }) {
  return <h1 className={style.h1} {...other}>{children}</h1>;
}

NotFound.H1 = H1;

function H2({ children, ...other }) {
  return <h1 className={style.h2} {...other}>{children}</h1>;
}

NotFound.H2 = H2;

export default NotFound;
