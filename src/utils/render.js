import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import createRouter from '../containers/Routes';
import Html from '../containers/Html';
import configureStore from './configureStore';
const debug = require('debug')('app');

/**
 * Fetch data needed by components in the current route.
 * Depends on components containing a prefetchData static method.
 */
function prefetchData(components, args) {
  const promises = (Array.isArray(components) ? components : [components])
    .filter(comp =>
      comp && comp.prefetchData && typeof comp.prefetchData === 'function'
    )
    .map(comp =>
      comp.prefetchData(args)
    );

  if (promises.length) {
    debug('prefetch');
  }
  return Promise.all(promises);
}

export default (req, res) => {
  const initialState = {
    auth: {
      token: req.cookies.token,
      isAuthenticated: !!req.user,
    }
  };
  const store = configureStore(initialState);
  const location = createLocation(req.url);
  const routes = createRouter(createMemoryHistory(), store);

  function hydrateOnClient() {
    const html = <Html state={store.getState()} />;
    res.send(`<!DOCTYPE html>\n${renderToString(html)}`);
  }

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500);
      hydrateOnClient();
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      prefetchData(renderProps.components, {
        dispatch: store.dispatch,
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
      }).then(() => {
        const component = (
          <Provider store={store}>
            { <RouterContext {...renderProps} /> }
          </Provider>
        );
        const html = <Html component={component} state={store.getState()} />;
        res.status(200).send(`<!DOCTYPE html>\n${renderToString(html)}`);
      }).catch(() => {
        hydrateOnClient();
      });
    } else {
      res.status(404).send('Not found');
    }
  });
};
