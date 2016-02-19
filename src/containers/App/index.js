import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import jwtDecode from 'jwt-decode';
import { logout } from '../../actions/auth';
import NavLink from '../../components/NavLink';
import config from '../../config';
import styles from './App.css';

const propTypes = {
  children: PropTypes.object.isRequired,
  username: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const contextTypes = {
  router: PropTypes.object
};

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      // login
      this.context.router.push('/dashboard');
    } else if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
      // logout
      this.context.router.push('/');
    }
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { username, isAuthenticated } = this.props;
    return (
      <div className={styles.root}>
        <Helmet {...config.app.head}/>
        <div className={styles.nav}>
          <div className={styles.navWrapper}>
            <Link to="/" className={styles.navLogo}>rice&nbsp;wars</Link>
            { isAuthenticated &&
                <span className={styles.welcome}>
                  {`welcome ${username} `}
                </span> }
            { isAuthenticated &&
                <NavLink to="#" onClick={this.handleLogout}>Logout</NavLink> }
            { !isAuthenticated &&
                <NavLink to="/login">Login</NavLink> }
            { !isAuthenticated &&
                <NavLink to="/register">Register</NavLink> }
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;
App.contextTypes = contextTypes;

function mapStateToProps(state) {
  const { auth: { isAuthenticated, token } } = state;
  const username = isAuthenticated ? jwtDecode(token).username : null;
  return {
    isAuthenticated,
    username,
  };
}

export default connect(mapStateToProps, { logout })(App);
