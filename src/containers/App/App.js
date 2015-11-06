import React, { Component } from 'react';
import { Link } from 'react-router';

export class App extends Component {
  render() {
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <Link to="/home" className="navbar-brand">rice wars</Link>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/ayy">ayy</Link></li>
              <li><Link to="/lmao">lmao</Link></li>
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
