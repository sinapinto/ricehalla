import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
