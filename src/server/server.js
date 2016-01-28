import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import configureStore from '../store/configureStore';
import createRoutes from '../containers/routes';
import { Provider } from 'react-redux';

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

function renderHTML(html, initialState, scriptSrc) {
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
        <script src="${scriptSrc}"></script>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  const store = configureStore({
    counter: {magic: 1}
  });
  const location = createLocation(req.url);
  const routes = createRoutes(createMemoryHistory());

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {

      function getReduxPromise() {
        const comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
        return comp.fetchData ?  comp.fetchData({store}) : Promise.resolve();
      }


      getReduxPromise().then(() => {
        const html = renderToString(
          <Provider store={store}>
              { <RouterContext {...renderProps}/> }
          </Provider>
        );
        const initialState = store.getState();
        const scriptSrc = (process.env.NODE_ENV === 'production')
          ? '/static/bundle.js'
          : `http://localhost:${port + 1}/static/bundle.js`;
        res.status(200).send(renderHTML(html, initialState, scriptSrc));


      });

    } else {
      res.status(404).send('Not found');
    }
  });
}

app.use('/static', express.static(`${__dirname}/../dist`));

app.get('/api/counter', (req, res) => {
  setTimeout(() => res.status(200).send({ response: 420 }), 400);
});

// app.use(handleRender);
app.get('*', handleRender);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('Server is listening at http://localhost:%s', port);
});
