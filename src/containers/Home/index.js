import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Card from '../../components/Card';
import styles from './Home.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Helmet title="Home" />
        <Card>
          <h1 className={styles.header}>Contests</h1>
        </Card>
      </div>
    );
  }
}

export default Home;
