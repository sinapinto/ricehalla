import React from 'react';
import { Route, Router } from 'react-router';
import App from './App';
import Battle from './Battle';

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/:id" component={Battle} />
    </Router>
  );
}
