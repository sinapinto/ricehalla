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
import render from './utils/render';
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

app.get('*', render);

sequelize.sync()
.then(() => {
  app.listen(__PORT__, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`▲ ${process.env.NODE_ENV} server listening at http://localhost:${__PORT__}`);
    }
  });
});
