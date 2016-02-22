/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import expressJwt from 'express-jwt';
import sequelize from '../api/sequelize';
import auth from '../api/auth';

import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import createRouter from './containers/Routes';
import Html from './containers/Html';
import prefetchData from './utils/prefetchData';
import config from './config';

const app = express();

if (__DEV__) {
  const webpackConfig = require('../webpack/client.babel.js').default;
  const opts = {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  };
  const compiler = require('webpack')(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, opts));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.disable('x-powered-by');
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
app.use(favicon(path.resolve(__dirname, '../static/favicon.ico')));
app.use(express.static(path.join(__dirname, '../static')));

app.use(expressJwt({
  secret: config.jwt.secret,
  credentialsRequired: false,
  getToken: (req) => req.cookies.token,
}));

app.use('/auth', auth);

app.get('*', (req, res) => {
  const token = req.cookies.token;
  const initialState = {
    auth: {
      token,
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
        const html = <Html component={component} state={store.getState()} />;
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
});

sequelize.sync({ force: true })
.then(() => {
  app.listen(__PORT__, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`▲ ${process.env.NODE_ENV} server listening at http://localhost:${__PORT__}`);
    }
  });
});
