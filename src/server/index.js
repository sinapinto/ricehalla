import 'babel-polyfill';
import path from 'path';
import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import favicon from 'koa-favicon';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import responseTime from 'koa-response-time';
import serve from 'koa-static';
import cors from 'koa-cors';
import mount from 'koa-mount';
import _debug from 'debug';
import jwt from 'koa-jwt';
import db from './db';
import api from './api';
import auth from './auth';
import render from './render';
import config from '../../config/index.json';

const app = koa();

_debug.enable('app');
const debug = _debug('app');

// webpack middleware to serve bundles
// in memory and add hot reloading
// ------------------------------------
if (__DEV__) {
  const webpackConfig = require('../../config/webpack/client.babel.js').default;
  const opts = {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  };
  const compiler = require('webpack')(webpackConfig);
  app.use(require('koa-webpack-dev-middleware')(compiler, opts));
  app.use(require('koa-webpack-hot-middleware')(compiler));
}

// set X-Response-Time header
app.use(responseTime());

// console.log HTTP traffic
app.use(logger());

// set various security headers
app.use(helmet());

// production middleware to
// cache and compress responses
// --------------------------------
if (!__DEV__) {
  app.use(require('koa-conditional-get')());
  app.use(require('koa-compress')());
  app.use(require('koa-etag')());

  const cache = require('lru-cache')({
    maxAge: 30000 // global max age
  });

  app.use(require('koa-cash')({
    get(key) {
      return cache.get(key);
    },
    set(key, value) {
      cache.set(key, value);
    }
  }));
}

// serve static assets
app.use(favicon(path.resolve(__dirname, '../../static/favicon.ico')));
app.use(serve(path.join(__dirname, '../../static')));

// store parsed body in `this.request.body`
app.use(bodyparser());

// verify jwt token and set `this.state.user`
app.use(jwt({
  secret: config.jwt.secretOrKey,
  cookie: 'token',
  key: 'user',
  passthrough: true,
}));

app.use(function *(next) {
  // debug(`cookie: ${this.cookies.get('token')}`);
  // debug(`verified: ${!!this.state.user}`);
  yield next;
});

// app.on('error', err => debug(`error: ${err.message}`));

app.use(mount('/auth', cors()));
app.use(mount('/auth', auth.routes()));
app.use(mount('/api/v1', cors()));
app.use(mount('/api/v1', api.v1));
app.use(mount('/', render));

// sync models to the DB and start the server
// -------------------------------------------
db.sequelize.sync()
.then(() => {
  app.listen(__PORT__);
  debug(`${process.env.NODE_ENV} server listening at http://${__HOST__}:${__PORT__}`);
})
.catch(e => console.error(e)); // eslint-disable-line no-console

export default app;
