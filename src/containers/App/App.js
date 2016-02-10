import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import NavLink from '../../components/NavLink/NavLink.js';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.appWrapper}>
        <div className={styles.nav}>
          <div className={styles.navWrapper}>
            <Link to="/" className={styles.navLogo}>rice&nbsp;wars</Link>
            <div>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;

App.propTypes = {
  children: PropTypes.object.isRequired,
};
