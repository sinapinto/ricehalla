import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import createRoutes from '../containers/routes';

import Page from './page';
import prefetchData from './prefetchData';

export default function handleRender(req, res) {
  const store = configureStore({
    counter: { magic: 1 },
  });
  const location = createLocation(req.url);
  const routes = createRoutes(createMemoryHistory());

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      prefetchData(renderProps.components).then(() => {
        const component = (
          <Provider store={store}>
            { <RouterContext {...renderProps} /> }
          </Provider>
        );
        const scriptSrc = __DEV__
          ? `http://localhost:${__PORT__ + 1}/dist/bundle.js`
          : '/dist/bundle.js';

        const html = (
          <Page component={component}
            state={store.getState()}
            script={scriptSrc}
          />
        );
        res.status(200).send(`<!DOCTYPE html>\n${renderToString(html)}`);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
}
