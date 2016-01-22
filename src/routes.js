import React from 'react';
import { Route, Router } from 'react-router';
import App from './containers/App';
import Battle from './containers/Battle';

export default function(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/:id" component={Battle} />
    </Router>
  );
}
