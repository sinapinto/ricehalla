import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createRouter from './containers/routes';
import configureStore from './store/configureStore';
import DevTools from './containers/DevTools';

const store = configureStore(window.__INITIAL_STATE__);
const rootElem = document.getElementById('root');

render(
  <Provider store={store}>
      { createRouter(browserHistory) }
  </Provider>,
  rootElem
);

if (process.env.NODE_ENV !== 'production') {
  render(
    <Provider store={store}>
      <div>
        { createRouter(browserHistory) }
        { process.env.NODE_ENV !== 'production' && <DevTools /> }
      </div>
    </Provider>,
    rootElem
  );
}
