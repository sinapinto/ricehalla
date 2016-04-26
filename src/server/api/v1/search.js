import Resource from 'koa-resource-router';
import { Rice } from '../../db';
import _debug from 'debug';
const debug = _debug('app:search');

export default new Resource('search', {
  // GET /search
  *index() {
    // q: query, p: page
    const { q = '' } = this.query;
    debug(this.query);
    try {
      const rice = yield Rice.findAll({
        order: [['updated_at', 'DESC']],
        attributes: [
          'id',
          'title',
          'created_at',
          'updated_at',
          'title',
          'description',
          'likes',
          'url',
        ],
        // include: [{
        //   model: User,
        //   attributes: ['username'],
        //   required: true
        // }, {
        //   model: Tag,
        //   attributes: ['name'],
        //   required: false,
        // }],
        where: {
          $or: [
            { title: { $like: `%${q}%` } },
            { description: { $like: `%${q}%` } }
          ]
        },
        raw: true,
      });
      this.type = 'json';
      this.status = 200;
      this.body = rice;
    } catch (err) {
      this.type = 'json';
      this.status = 403;
      this.body = err;
    }
  },
});
