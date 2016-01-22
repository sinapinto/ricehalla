import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import configureStore from './store/configureStore';

import App from './containers/App';
import Battle from './containers/Battle';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='/:id' component={Battle} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
