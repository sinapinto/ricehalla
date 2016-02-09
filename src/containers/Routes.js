import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './App/App';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import NotFound from './NotFound/NotFound';

export default function (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
