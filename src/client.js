import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createRouter from './containers/routes';
import configureStore from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);
const rootElem = document.getElementById('root');

render(
  <Provider store={store}>
      { createRouter(browserHistory) }
  </Provider>,
  rootElem
);

if (process.env.NODE_ENV !== 'production') {
  if (!rootElem.firstChild ||
      !rootElem.firstChild.attributes ||
      !rootElem.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. ' +
                  'Make sure that your initial render does ' +
                  'not contain any client-side code.');
  }
}

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./containers/DevTools').default;

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
