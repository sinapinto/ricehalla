import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createRouter from '../routes';
import DevTools from './DevTools';

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          { createRouter(browserHistory) }
          <DevTools />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
