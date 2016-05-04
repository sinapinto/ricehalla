import Resource from 'koa-resource-router';
import { Tag } from '../../db';

export default new Resource('tag', {
  // GET /tag
  *index() {
    this.body = yield Tag.findAll({
      attributes: ['name'],
    });
  },
});

