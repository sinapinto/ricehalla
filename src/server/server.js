/* eslint-disable no-console */

import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import render from './render';
import login from './login';

const app = express();

if (__DEV__) {
  const webpackConfig = require('../../webpack/client.babel.js').default;
  const opts = {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  };
  const compiler = require('webpack')(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, opts));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(compression());
app.use(favicon(path.resolve(__dirname, '..', '..', 'static/favicon.ico')));
app.use(express.static(path.join(__dirname, '../../static')));

app.get('/auth/login', login);
app.all('*', render);

app.listen(__PORT__, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('%s server is listening at http://localhost:%s',
                  process.env.NODE_ENV || 'development', __PORT__);
  }
});
