import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import createRouter from '../routes';

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        { createRouter(browserHistory) }
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
