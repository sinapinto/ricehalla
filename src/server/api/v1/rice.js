import Resource from 'koa-resource-router';
import Parameter from 'parameter';
import { Rice } from '../../db';
import _debug from 'debug';
const debug = _debug('app:rice');
const parameter = new Parameter({});

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
        order: [['created_at', 'DESC']],
        attributes: ['title', 'description', 'likes', 'url'],
        raw: true,
      });
      if (!rice) {
        this.throw(404);
      }
      this.type = 'json';
      this.status = 200;
      this.body = rice;
    } catch (err) {
      this.type = 'json';
      this.status = 403;
      this.body = err;
    }
  },

  // POST /rice
  create: [requireAuth, function *create() {
    const body = this.request.body;
    debug(body);
    const rule = {
      title: { type: 'string' },
      description: {
        required: false,
        type: 'string',
      },
      tags: {
        required: false,
        type: 'array',
        itemType: 'string',
        rule: {
          type: 'string',
          allowEmpty: true
        }
      },
      url: {
        required: false,
        type: 'url'
      }
    };
    const errors = parameter.validate(rule, this.request.body);
    if (errors) {
      debug(errors);
      this.throw(400, errors);
    }

    try {
      // yield this.request.body.tags.map(name => Tag.upsert({ name }));
      const rice = yield Rice.create(this.request.body, {
        fields: ['title', 'description', 'url']
      });
      this.type = 'json';
      this.status = 201;
      this.body = rice;
    } catch (err) {
      this.type = 'json';
      this.status = 403;
      this.body = err;
    }
  }],

  // GET /rice/:rice
  show: function* show() {
    const rice = yield Rice.findOne({
      where: { id: this.params.rice }
    });
    if (!rice) {
      this.throw(404);
    }
    this.type = 'json';
    this.status = 200;
    this.body = rice;
  },

  // PUT /rice/:rice
  *update() {
    this.body = 'update';
  },

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
