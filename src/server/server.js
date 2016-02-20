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
import Sequelize from 'sequelize';
import render from './render';
import config from '../config';

/* eslint-disable */
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.config);
const User = sequelize.define('user', {
  username:           { type: Sequelize.STRING(50),  field: 'username',                                                    },
  email:              { type: Sequelize.STRING(100), field: 'email',                                                       },
  passwordHash:       { type: Sequelize.STRING(75),  field: 'password_hash',                                               },
  isAdmin:            { type: Sequelize.BOOLEAN,     field: 'is_admin',             defaultValue: false,                   },
  passwordResetToken: { type: Sequelize.STRING(75),  field: 'password_reset_token',                                        },
  sessionToken:       { type: Sequelize.STRING(75),  field: 'session_token',        defaultValue: "",    allowNull: false, },
  about:              { type: Sequelize.TEXT,        field: 'about',                                                       },
  karma:              { type: Sequelize.INTEGER,     field: 'karma',                defaultValue: 0,     allowNull: false, },
  invitedByUserId:    { type: Sequelize.INTEGER,     field: 'invited_by_user_id',                                          },
});
/* eslint-enable */

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
  secret: config.jwt.secret,
  credentialsRequired: false,
  getToken: (req) => req.cookies.token,
}));

app.post('/auth/login', (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    where: { username }
  }).then(user => {
    bcrypt.compare(password, user.dataValues.passwordHash, (err, success) => {
      if (err) {
        next(err);
      } else if (success) {
        const token = jwt.sign({ username }, config.jwt.secret, { expiresIn: config.jwt.expires });
        res.status(201).cookie('token', token).json({ token });
      } else {
        res.sendStatus(401);
      }
    });
  });
});

app.post('/auth/signup', (req, res, next) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      next(err);
    } else {
      User.create({
        username,
        email: '',
        passwordHash: hash,
        isAdmin: false,
        passwordResetToken: '',
        sessionToken: '',
        about: '',
        karma: 0,
        invitedByUserId: 0,
      }).then(() => res.sendStatus(201));
    }
  });
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
      const decoded = jwt.verify(token.replace('Bearer ', ''), config.jwt.secret);
      res.status(200).json({ username: decoded.username });
    } catch (e) {
      res.sendStatus(401);
    }
  }
});

app.all('*', render);

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
