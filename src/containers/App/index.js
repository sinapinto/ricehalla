import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import jwtDecode from 'jwt-decode';
import { logout } from '../../actions/auth';
import NavLink from '../../components/NavLink';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object,
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
      this.context.router.push('/');
    } else if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
      // logout
      this.context.router.push('/');
    }
  }

  getMeta() {
    return [
      { name: 'description', content: 'sharing dotfiles' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'utf-8' },
      { property: 'og:site_name', content: 'ricehalla' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:title', content: 'ricehalla' },
      { property: 'og:description', content: 'sharing dotfiles' },
    ];
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  noNav() {
    const { route, location } = this.props;
    return ~route.noNav.indexOf(location.pathname);
  }

  loggedInNav() {
    return (
      <div className={styles.nav}>
        <div className={styles.navWrapper}>
          <Link to="/" className={styles.navLogo}>ricehalla</Link>
          <NavLink to="/submit" theme="success">Submit</NavLink>
          <NavLink to={`/user/${this.props.username}`} className={styles.welcome}>
            {this.props.username}
          </NavLink>
          <NavLink to="#" onClick={this.handleLogout}>Logout</NavLink>
        </div>
      </div>
    );
  }

  loggedOutNav() {
    return (
      <div className={styles.nav}>
        <div className={styles.navWrapper}>
          <Link to="/" className={styles.navLogo}>ricehalla</Link>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login" theme="primary">Log In</NavLink>
        </div>
      </div>
    );
  }

  renderNav() {
    if (this.noNav()) {
      return null;
    }
    if (this.props.isAuthenticated) {
      return this.loggedInNav();
    }
    return this.loggedOutNav();
  }

  render() {
    return (
      <div className={styles.root}>
        <Helmet title="ricehalla" meta={this.getMeta()} />
        {this.renderNav()}
        <div className={styles.childWrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.contextTypes = contextTypes;

function mapStateToProps(state) {
  const { auth: { isAuthenticated, token } } = state;
  const username = (token && isAuthenticated) ? jwtDecode(token).username : null;
  return {
    isAuthenticated,
    username,
  };
}

export default connect(mapStateToProps, { logout })(App);
