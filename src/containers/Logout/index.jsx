import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import cookie from '../../utils/cookie';
import style from './style.css';

const propTypes = {
  logout: PropTypes.func.isRequired,
};

const contextTypes = {
  router: PropTypes.object
};

class Logout extends Component {
  componentDidMount() {
    cookie.removeAll();
    this.props.logout();
    this.timeoutId = setTimeout(() => {
      this.context.router.replace('/');
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    return (
      <div className={style.logout}>
        You&apos;ve logged out. Time to go home..
      </div>
    );
  }
}

Logout.propTypes = propTypes;
Logout.contextTypes = contextTypes;

export default connect(undefined, { logout })(Logout);