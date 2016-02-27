import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/user';
import config from '../src/config';

const router = new Router();

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({
    where: { username }
  })
  .then(user => {
    if (!user) {
      return setTimeout(() => res.sendStatus(401), 1000);
    }
    bcrypt.compare(password, user.dataValues.passwordHash, (err, success) => {
      if (err) {
        next(err);
      } else if (success) {
        const token = jwt.sign({ username }, config.jwt.secret, { expiresIn: config.jwt.expires });
        res
         .status(201)
         .cookie('token', token)
         .json({ token });
      } else {
        res.sendStatus(401);
      }
    });

    return user;
  });
});

router.post('/signup', (req, res, next) => {
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
        sessionToken: '',
        about: '',
      }).then(() => res.sendStatus(201));
    }
  });
});

router.get('/logout', (req, res) => {
  res
   .status(204)
   .clearCookie('token')
   .send();
});

export default router;
