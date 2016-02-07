import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createRouter from './containers/Routes';
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

// re-render with redux devtools in development
if (process.env.NODE_ENV !== 'production') {
  render(
    <Provider store={store}>
      <div>
        { createRouter(browserHistory) }
        <DevTools />
      </div>
    </Provider>,
    rootElem
  );
}
