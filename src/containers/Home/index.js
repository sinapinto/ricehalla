import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { loadRice } from '../../actions/rice';
import Card from '../../components/Card';
import styles from './Home.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Helmet title="ricehalla" />
        <Card>
          <h1 className={styles.header}>rice</h1>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { loadRice })(Home);
