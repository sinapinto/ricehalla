import React, { Component } from 'react';
import { Link } from 'react-router';

export class Home extends Component {
  render() {
    const styles = require('./Home.scss');

    return (
      <div className={styles.home}>
        <div className="jumbotron">
          <div className={styles.jumbotron}>
            <div class="container">
              <h1>wew lad</h1>
              <p>asdf</p>
            </div>
          </div>
        </div>
        <div className={styles.homeContent}>
          <Link to="/contest/1"><button className="btn btn-default">contest one</button></Link>
          <Link to="/contest/2"><button className="btn btn-default">contest two</button></Link>
          <Link to="/contest/3"><button className="btn btn-default">contest three</button></Link>
        </div>
      </div>
    );
  }
}
