import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './App/App';
import Home from './Home/Home';
import Create from './Create/Create';
import NotFound from './NotFound/NotFound';

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/create" component={Create} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
