import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { submitRice } from '../../actions/rice';
import styles from './styles.css';

const propTypes = {
  submitRice: PropTypes.func.isRequired,
};

class Submit extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Helmet title="Submit | ricehalla" />
      </div>
    );
  }
}

Submit.propTypes = propTypes;

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { submitRice })(Submit);
