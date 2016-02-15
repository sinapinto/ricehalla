import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth.js';
import NavLink from '../../components/NavLink/NavLink.js';
import styles from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { token } = this.props;
    return (
      <div className={styles.appWrapper}>
        <div className={styles.nav}>
          <div className={styles.navWrapper}>
            <Link to="/" className={styles.navLogo}>rice&nbsp;wars</Link>
            { !token ? (
              <div>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </div>
              ) : (
              <a href="#" onClick={this.handleLogout}>Logout</a>
              )
            }
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  state => ({ token: state.auth.token }),
  { logout }
)(App);

App.propTypes = {
  children: PropTypes.object.isRequired,
  token: PropTypes.string,
  logout: PropTypes.func.isRequired,
};
