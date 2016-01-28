import React from 'react';
import { Route, Router } from 'react-router';
import App from './App';

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  );
}
