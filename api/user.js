import { Router } from 'express';
import User from './models/user';

const router = new Router();

router.get('/:id', (req, res, next) => {
  User.findOne({
    where: { id }
  })
  .then(user => {
    if (!user) {
      return res.sendStatus(401);
    }
    res.status(201).json({ user });
  });
});


export default router;
