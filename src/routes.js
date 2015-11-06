import React from 'react';
import { Route } from 'react-router';
import { App, Home, Contest } from 'containers';

export default (
  <Route path="/" component={App}>
    <Route path="home" component={Home}/>
    <Route path="contest/:contestID" component={Contest}/>
  </Route>
);
