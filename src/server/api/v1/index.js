import compose from 'koa-compose';
import user from './user';
import rice from './rice';
import tag from './tag';
import upload from './upload';

const router = compose([
  user.middleware(),
  rice.middleware(),
  tag.middleware(),
  upload.middleware(),
]);

export default router;
