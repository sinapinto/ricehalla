import compose from 'koa-compose';
import user from './user';
import rice from './rice';
import tag from './tag';
import search from './search';

const router = compose([
  user.middleware(),
  rice.middleware(),
  tag.middleware(),
  search.middleware(),
]);

export default router;
