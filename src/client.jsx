import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createRouter from './containers/Routes';
import configureStore from './utils/configureStore';
import DevTools from './containers/DevTools';
import './style';

const store = configureStore(window.__INITIAL_STATE__);
const rootElem = document.getElementById('root');

render(
  <Provider store={store}>
      { createRouter(browserHistory, store) }
  </Provider>,
  rootElem
);

// re-render with redux devtools in development.
// Note that this can cause network requests to be repeated
// on the initial page load in development.
if (__DEV__) {
  render(
    <Provider store={store}>
      <div style={{ height: '100%' }}>
        { createRouter(browserHistory, store) }
        <DevTools />
      </div>
    </Provider>,
    rootElem
  );
}
