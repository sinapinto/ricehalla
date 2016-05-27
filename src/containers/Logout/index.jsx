import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import cookie from '../../utils/cookie';
import style from './style.css';

class Logout extends Component {
  componentDidMount() {
    cookie.removeAll();
    this.props.logout();
    this.timeoutId = setTimeout(() => {
      this.context.router.replace('/');
    }, 1200);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    return (
      <div className={style.logout}>
         Logged out successfully. Hang on..
      </div>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

Logout.contextTypes = {
  router: PropTypes.object
};

export default connect(null, {
  logout,
})(Logout);
