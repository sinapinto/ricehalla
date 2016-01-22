import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import createRouter from './routes';
import configureStore from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

render(
  <Provider store={store}>
    { createRouter(browserHistory) }
  </Provider>,
  document.getElementById('root')
);
