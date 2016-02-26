import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Dashboard from './Dashboard';
import NotFound from './NotFound';

export default function createRouter(history, store) {
  function requireAuth(nextState, replace, cb) {
    const { auth: { isAuthenticated } } = store.getState();
    if (!isAuthenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
    cb();
  }

  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user/:id" component={Profile} />
        <Route onEnter={requireAuth}>
          <Route path="/dashboard" component={Dashboard} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
