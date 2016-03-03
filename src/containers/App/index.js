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
      this
       .context
       .router
       .push('/');
    } else if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
      // logout
      this
        .context
        .router
        .push('/');
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
        <Helmet title="ricehalla" meta={[
          { name: 'description', content: 'sharing dotfiles' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'ricehalla' },
          { property: 'og:locale', content: 'en_US' },
          { property: 'og:title', content: 'ricehalla' },
          { property: 'og:description', content: 'sharing dotfiles' }
        ]}
        />
        <div className={styles.nav}>
          <div className={styles.navWrapper}>
            <Link to="/" className={styles.navLogo}>ricehalla</Link>
            { isAuthenticated &&
                <NavLink to="/submit" theme="success">Submit</NavLink> }
            { isAuthenticated &&
                <NavLink to={`/user/${username}`} className={styles.welcome}>
                  {username}
                </NavLink> }
            { isAuthenticated &&
                <NavLink to="#" onClick={this.handleLogout}>Logout</NavLink> }
            { !isAuthenticated &&
                <NavLink to="/register">Register</NavLink> }
            { !isAuthenticated &&
                <NavLink to="/login" theme="primary">Log&nbsp;In</NavLink> }
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
  const username = (token && isAuthenticated) ? jwtDecode(token).username : null;
  return {
    isAuthenticated,
    username,
  };
}

export default connect(mapStateToProps, { logout })(App);
