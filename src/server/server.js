import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';
import createRoutes from '../containers/routes';

import Page from './page';

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

function handleRender(req, res) {
  const store = configureStore({
    counter: { magic: 1 }
  });
  const location = createLocation(req.url);
  const routes = createRoutes(createMemoryHistory());

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    function getReduxPromise() {
      const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
      return comp.fetchData ? comp.fetchData({ store }) : Promise.resolve();
    }

    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      getReduxPromise().then(() => {
        const component = (
          <Provider store={store}>
            { <RouterContext {...renderProps}/> }
          </Provider>
        );
        const scriptSrc = (process.env.NODE_ENV === 'production')
          ? '/static/bundle.js'
          : `http://localhost:${port + 1}/static/bundle.js`;

        res.status(200).send('<!DOCTYPE html>\n' +
          renderToString(<Page component={component} state={store.getState()} script={scriptSrc} />));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
}

// app.use('/static', express.static(`${__dirname}/../dist`));

app.get('/api/counter', (req, res) => {
  setTimeout(() => res.status(200).send({ response: 420 }), 400);
});

app.all('*', handleRender);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('Server is listening at http://localhost:%s', port);
});
