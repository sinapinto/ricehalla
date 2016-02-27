import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ContainerBox from '../../components/ContainerBox';
import styles from './Home.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Helmet title="Home" />
        <ContainerBox>
          <h1 className={styles.header}>Contests</h1>
        </ContainerBox>
      </div>
    );
  }
}

export default Home;
