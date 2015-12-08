import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

export class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <IndexLink to="/" className="navbar-brand">rice wars</IndexLink>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/create">new contest</Link></li>
            </ul>
          </div>
        </nav>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
