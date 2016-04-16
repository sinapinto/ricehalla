import compose from 'koa-compose';
import user from './user';
import rice from './rice';
import tag from './tag';
import search from './search';
import upload from './upload';

const router = compose([
  user.middleware(),
  rice.middleware(),
  tag.middleware(),
  search.middleware(),
  upload.middleware(),
]);

export default router;
