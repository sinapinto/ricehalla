import Resource from 'koa-resource-router';
import parse from 'co-body';
import Parameter from 'parameter';
import _debug from 'debug';
import { Rice, User, Tag } from '../../db';
const debug = _debug('app:rice');
const parameter = new Parameter({});

const MAX_TAGS = 15;

function *requireAuth(next) {
  if (this.state.user) {
    yield next;
  } else {
    yield next;
    // this.throw(401);
  }
}

export default new Resource('rice', {
  // GET /rice
  index: function *index() {
    try {
      const rice = yield Rice.findAll({
        order: [['createdAt', 'DESC']],
        // attributes: { exclude: ['deletedAt'] },
        include: [
          {
            model: User,
            attributes: ['username'],
            required: true,
          },
          {
            model: Tag,
            attributes: ['name', 'count'],
            required: true,
          },
        ],
      });
      this.type = 'json';
      this.status = 200;
      this.body = JSON.stringify(rice);
    } catch (err) {
      this.type = 'json';
      this.status = 403;
      this.body = err;
    }
  },

  // POST /rice
  create: [requireAuth, function *create() {
    const body = yield parse(this);
    debug(body);
    const rule = {
      userId: { type: 'number', required: true },
      title: { type: 'string', required: true },
      description: { type: 'string', allowEmpty: true, required: false },
      files: { type: 'array', itemType: 'string', required: false },
      tags: { type: 'string', allowEmpty: true, required: false },
    };
    const errors = parameter.validate(rule, body);
    if (body.tags) {
      body.tags = body.tags.split(',', MAX_TAGS);
    }
    if (errors) {
      this.type = 'json';
      this.status = 200;
      this.body = { errors };
      return;
    }
    const fields = [
      'userId',
      'title',
      'description',
      'files',
    ];
    try {
      body.files = JSON.stringify(body.files);
      const rice = yield Rice.create(body, { fields });

      // create tag or increment its count
      for (let i = 0; i < body.tags.length; i++) {
        const found = yield Tag.findOne({
          where: { name: body.tags[i].toLowerCase() },
        });
        if (found) {
          found.increment('count');
        } else {
          const newTag = yield Tag.create({ name: body.tags[i] });
          yield rice.addTag(newTag);
        }
      }
      this.type = 'json';
      this.status = 201;
      this.body = rice;
    } catch (err) {
      debug(err);
      this.throw(403, 'error creating rice');
    }
  }],

  // GET /rice/:rice
  show: function *show() {
    const rice = yield Rice.findOne({
      where: { id: this.params.rice },
    });
    if (!rice) {
      this.throw(404);
    }
    this.type = 'json';
    this.status = 200;
    this.body = rice;
  },

  // PUT /rice/:rice
  // *update() {
  // },

  // DELETE /rice/:rice
  destroy: [requireAuth, function *destroy() {
    const found = yield Rice.findOne({
      where: { id: this.params.rice }
    });
    if (!found) {
      this.throw(404);
    }
    const rice = yield found.destroy();
    this.type = 'json';
    this.status = 200;
    this.body = rice;
  }]
});
