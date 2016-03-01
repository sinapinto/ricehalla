import bcrypt from 'co-bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './db';
import config from '../config';
const router = require('koa-router')();

router.post('/signup', function *() {
  const { username, password } = this.request.body;

  // throw if username is taken
  const exists = yield User.findOne({ where: { username } });
  if (exists) {
    this.throw(400);
  }

  const salt = yield bcrypt.genSalt(10);
  const hash = yield bcrypt.hash(password, salt);
  this.body = yield User.create({
    username,
    email: '',
    passwordHash: hash,
    about: '',
  });

  this.status = 201;
});


router.post('/login', function *() {
  const { username, password } = this.request.body;
  const user = yield User.findOne({ where: { username } });
  this.assert(user, 401);

  // check password
  const valid = yield bcrypt.compare(password, user.dataValues.passwordHash);
  this.assert(valid, 401);

  const token = jwt.sign({ username }, config.jwt.secretOrKey, config.jwt.options);
  this.type = 'json';
  this.body = { token };
});


router.get('/logout', function *() {
  this.cookies.set('token', '', { expires: new Date(0) });
  this.status = 200;
});

export default router;
