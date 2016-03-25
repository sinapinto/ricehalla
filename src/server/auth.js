import bcrypt from 'co-bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './db';
import config from '../../config/index.json';
const router = require('koa-router')();

router.post('/signup', function *signup() {
  const { username, password, email } = this.request.body;

  const salt = yield bcrypt.genSalt(10);
  const hash = yield bcrypt.hash(password, salt);
  this.body = yield User.create({
    username,
    email,
    passwordHash: hash,
    about: '',
  });

  this.status = 201;
  const token = jwt.sign({ username }, config.jwt.secretOrKey, config.jwt.options);
  this.type = 'json';
  this.body = { token };
});


router.post('/login', function *login() {
  const { username, password, rememberme } = this.request.body;
  const user = yield User.findOne({
    where: {
      $or: [
        { username },
        { email: username }
      ]
    },
  });
  this.assert(user, 401);

  // check password
  const valid = yield bcrypt.compare(password, user.dataValues.passwordHash);
  this.assert(valid, 401);

  if (rememberme) {
    config.jwt.options.expiresIn = '30d';
  }

  const token = jwt.sign({ username }, config.jwt.secretOrKey, config.jwt.options);
  this.type = 'json';
  this.body = { token };
});


router.get('/logout', function *logout() {
  this.cookies.set('token', '', { expires: new Date(0) });
  this.status = 200;
});

export default router;
