import { Router } from 'express';
import User from './models/user';

const router = new Router();

router.get('/:username', (req, res, next) => {
  User
  .findOne({
    where: { username: req.params.username }
  })
  .then(user => {
    if (!user) {
      return res.sendStatus(401);
    }
    res.status(201).json({ user });
    return user;
  })
  .catch(err => next(err));
});


export default router;
