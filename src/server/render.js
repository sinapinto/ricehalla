/* eslint-disable no-console */

import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import createRoutes from '../containers/routes';

import Page from './page';
import prefetchData from './prefetchData';


export default function render(req, res) {
  const scriptSrc = __DEV__
    ? `http://localhost:${__PORT__ + 1}/dist/bundle.js`
    : '/dist/bundle.js';
  const store = configureStore({
    battle: {
      isFetching: false,
      entities: {},
      ids: [],
    },
  });
  const location = createLocation(req.url);
  const routes = createRoutes(createMemoryHistory());

  function hydrateClient() {
    const html = <Page state={store.getState()} script={scriptSrc} />;
    res.send(`<!DOCTYPE html>\n${renderToString(html)}`);
  }

  if (__DEBUG__) {
    hydrateClient();
    return;
  }

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error('ROUTER ERROR:', error);
      res.status(500);
      hydrateClient();
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      prefetchData(renderProps.components, store).then(() => {
        const html = (
          <Page component={component}
            state={store.getState()}
            script={scriptSrc}
          />
        );
        const component = (
          <Provider store={store}>
            { <RouterContext {...renderProps} /> }
          </Provider>
        );
        res.status(200).send(`<!DOCTYPE html>\n${renderToString(html)}`);
      }).catch(
        err => {
          console.error(err);
          hydrateClient();
        });
    } else {
      res.status(404).send('Not found');
    }
  });
}
