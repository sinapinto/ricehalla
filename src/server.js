import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation'
import { RouterContext, match, createMemoryHistory } from 'react-router'
import configureStore from './store/configureStore';
import createRoutes from './routes';
import { Provider } from 'react-redux';

const app = express();
const port = process.env.PORT || 3000;

app.use('/static', express.static(__dirname + '/../dist'));

const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}

app.get('*', (req, res) => {
  const store = configureStore();
  const location = createLocation(req.url);
  const routes = createRoutes(createMemoryHistory());

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const reactHTML = renderToString(
        <Provider store={store}>
          { <RouterContext {...renderProps}/> }
        </Provider>
      );
      const initialState = store.getState();
      res.status(200).send(renderFullPage(reactHTML, initialState));
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info("Server is listening to port: http://localhost:%s", port);
});
