import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import PostDetail from './PostDetail';
import Submit from './Submit';
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

  function requireUnauth(nextState, replace, cb) {
    const { auth: { isAuthenticated } } = store.getState();
    if (isAuthenticated) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname },
      });
    }
    cb();
  }

  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/" component={App} noNav={['/login', '/register']}>
        <IndexRoute component={Home} />
        <Route path="/user/:username" component={Profile} />
        <Route path="/rice/:id" component={PostDetail} />
        <Route onEnter={requireUnauth}>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Route>
        <Route onEnter={requireAuth}>
          <Route path="/submit" component={Submit} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
