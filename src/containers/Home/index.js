import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './Home.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Helmet title="Home" />
        <div className={styles.containerBox}>
          <h1 className={styles.header}>Contests</h1>
        </div>
      </div>
    );
  }
}

export default Home;
