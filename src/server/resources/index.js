import compose from 'koa-compose';
import user from './user';
import rice from './rice';

const router = compose([
  user.middleware(),
  rice.middleware()
]);

export default router;
