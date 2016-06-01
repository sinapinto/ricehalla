import crypto from 'crypto';
import bcrypt from 'co-bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './db';
import config from '../../config/index.json';
const router = require('koa-router')();

router.post('/signup', function *signup() {
  let { username, password } = this.request.body;
  username = username.substr(0, 20);
  const email = this.request.body.email.trim();
  const salt = yield bcrypt.genSalt(10);
  const passwordHash = yield bcrypt.hash(password, salt);

  const md5 = crypto.createHash('md5');
  md5.update(email.toLowerCase());
  const emailHash = md5.digest('hex');

  try {
    let query;
    // `ILIKE` is postgres-only
    if (__DEV__) {
      query = { where: { username: { $like: username } } };
    } else {
      query = { where: { username: { $iLike: username } } };
    }
    const exists = yield User.findOne(query);
    if (exists) {
      throw new Error;
    }
    const user = yield User.create({
      username,
      email,
      emailHash,
      passwordHash,
      about: '',
    });
    const payload = {
      id: user.id,
      username,
    };
    const token = jwt.sign(payload, config.jwt.secretOrKey, config.jwt.options);
    this.type = 'json';
    this.status = 201;
    this.body = { token, id: user.id };
  } catch (e) {
    this.type = 'json';
    this.status = 403;
    this.body = { message: 'Username or email already exists' };
  }
});


router.post('/login', function *login() {
  const { username, password, rememberme } = this.request.body;
  const user = yield User.findOne({
    where: {
      $or: [
        { username },
        { email: username },
      ],
    },
  });
  this.assert(user, 401);

  // check password
  const valid = yield bcrypt.compare(password, user.passwordHash);
  this.assert(valid, 401);

  if (rememberme) {
    config.jwt.options.expiresIn = '30d';
  }
  const payload = {
    id: user.id,
    username,
  };
  const token = jwt.sign(payload, config.jwt.secretOrKey, config.jwt.options);
  this.type = 'json';
  this.body = { token, id: user.id };
});


router.get('/logout', function *logout() {
  this.cookies.set('token', '', { expires: new Date(0) });
  this.status = 200;
});

export default router;
