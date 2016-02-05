import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './App/App';
import Home from './Home/Home';
import Create from './Create/Create';

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/create" component={Create} />
      </Route>
    </Router>
  );
}
