/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import render from './render';

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

app.disable('x-powered-by');
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
app.use(favicon(path.resolve(__dirname, '../../static/favicon.ico')));
app.use(express.static(path.join(__dirname, '../../static')));

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== 'aa' || password !== 'bb') {
    res.sendStatus(401);
  } else {
    const token = jwt.sign({ username }, 'secret-key', { expiresIn: "10h" });
    res.status(201).cookie('token', token).json({ token });
  }
});

app.get('/auth/logout', (req, res) => {
  res.status(204).clearCookie('token').send();
});

app.get('/profile', (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.sendStatus(401);
  } else {
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key');
      res.status(200).json({ username: decoded.username });
    } catch (e) {
      res.sendStatus(401);
    }
  }
});

app.all('*', render);

app.listen(__PORT__, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`▲ ${process.env.NODE_ENV} server listening at http://localhost:${__PORT__} ▲`);
});
