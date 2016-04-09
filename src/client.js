import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createRouter from './containers/Routes';
import configureStore from './utils/configureStore';
import DevTools from './containers/DevTools';
import './styles';

const store = configureStore(window.__INITIAL_STATE__);
const rootElem = document.getElementById('root');

render(
  <Provider store={store}>
      { createRouter(browserHistory, store) }
  </Provider>,
  rootElem
);

// re-render with redux devtools in development
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
