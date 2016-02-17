import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { logout } from '../../actions/auth';
import NavLink from '../../components/NavLink';
import styles from './App.css';

const propTypes = {
  children: PropTypes.object.isRequired,
  username: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

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
    const { username, isAuthenticated } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.nav}>
          <div className={styles.navWrapper}>
            <Link to="/" className={styles.navLogo}>rice&nbsp;wars</Link>
            { isAuthenticated ? (
              <div>
                {`welcome ${username} `}
                <a href="#" onClick={this.handleLogout}>Logout</a>
              </div>
              ) : (
              <div>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </div>
              )
            }
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  const { auth: { isAuthenticated, token } } = state;
  const username = isAuthenticated ? jwtDecode(token).username : null;
  return {
    isAuthenticated,
    username,
  };
}

export default connect(mapStateToProps, { logout })(App);
