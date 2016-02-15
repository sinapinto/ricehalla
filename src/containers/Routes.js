import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './App/App';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';
import NotFound from './NotFound/NotFound';

export default function createRouter(history, store) {
  function requireAuth(nextState, replace, cb) {
    const { auth: { isAuthenticated } } = store.getState();
    if (isAuthenticated) {
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
        <Route onEnter={requireAuth}>
          <Route path="/dashboard" component={Dashboard} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
