/* eslint-disable no-console */
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import bcrypt from 'bcrypt';
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

app.use(expressJwt({
  secret: 'secret-key',
  credentialsRequired: false,
  getToken: function (req) {
    return req.cookies.token;
  },
}));

app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'aa' && password === 'bb') {
    const token = jwt.sign({ username }, 'secret-key', { expiresIn: '10h' });
    res.status(201).cookie('token', token).json({ token });
  } else {
    setTimeout(() => res.sendStatus(401), 1000);
  }
});

app.post('/auth/signup', (req, res) => {
  const { username, password } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      // Store hash in your password DB.
      res.sendStatus(201);
    });
  });
});

app.get('/auth/logout', (req, res) => {
  res.status(204).clearCookie('token').send();
});

// app.get('/profile', (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     res.sendStatus(401);
//   } else {
//     try {
//       const decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key');
//       res.status(200).json({ username: decoded.username });
//     } catch (e) {
//       res.sendStatus(401);
//     }
//   }
// });

app.all('*', render);

app.listen(__PORT__, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`▲ ${process.env.NODE_ENV} server listening at http://localhost:${__PORT__} ▲`);
});
