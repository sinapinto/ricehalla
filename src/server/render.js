/* eslint-disable no-console */
import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../utils/configureStore';
import createRouter from '../containers/Routes';
import Html from './Html';
import prefetchData from '../utils/prefetchData';

export default function render(req, res) {
  const scriptSrc = __DEV__
    ? `http://localhost:${__PORT__}/dist/bundle.js`
    : '/dist/bundle.js';
  const token = req.cookies.token;
  // verify?
  const store = configureStore({ auth: { token } });
  const location = createLocation(req.url);
  const routes = createRouter(createMemoryHistory(), store);

  function hydrateOnClient() {
    const html = <Html state={store.getState()} script={scriptSrc} />;
    res.send(`<!DOCTYPE html>\n${renderToString(html)}`);
  }

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error('ROUTER ERROR:', error);
      res.status(500);
      hydrateOnClient();
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      prefetchData(renderProps.components, store).then(() => {
        const component = (
          <Provider store={store}>
            { <RouterContext {...renderProps} /> }
          </Provider>
        );
        const html = (
          <Html component={component}
            state={store.getState()}
            script={scriptSrc}
          />
        );
        res.status(200).send(`<!DOCTYPE html>\n${renderToString(html)}`);
      }).catch(
        err => {
          console.error(err);
          hydrateOnClient();
        });
    } else {
      res.status(404).send('Not found');
    }
  });
}
