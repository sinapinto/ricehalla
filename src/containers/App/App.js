import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className={styles.nav}>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
)(App);

App.propTypes = {
  children: PropTypes.object.isRequired,
};
