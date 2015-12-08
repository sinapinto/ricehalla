import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Contest } from 'containers';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="contest/:contestID" component={Contest}/>
  </Route>
);
