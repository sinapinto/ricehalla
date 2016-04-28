import Resource from 'koa-resource-router';
import Parameter from 'parameter';
import parse from 'co-body';
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

  // POST /rice
  create: [requireAuth, function *create() {
    const body = yield parse(this);
    debug(body);
    const rule = {
      userId: { type: 'number', required: true },
      title: { type: 'string', required: true },
      description: { type: 'string', required: false },
      files: { type: 'array', itemType: 'string', required: true },
      tags: { type: 'array', itemType: 'string', required: false },
    };
    const errors = parameter.validate(rule, body);
    body.files = JSON.stringify(body.files);
    if (errors) {
      debug(errors);
      this.type = 'json';
      this.status = 400;
      this.body = { errors };
      return;
    }
    try {
      const rice = yield Rice.create(body);
      this.type = 'json';
      this.status = 201;
      this.body = rice;
    } catch (err) {
      this.throw = (403, 'error creating rice');
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
