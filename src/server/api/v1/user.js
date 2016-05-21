import Resource from 'koa-resource-router';
import parse from 'co-body';
import Parameter from 'parameter';
import { User, Rice, Tag } from '../../db';
const debug = require('debug')('app:server:user');
const parameter = new Parameter({});

function *requireAuth(next) {
  if (this.state.user) {
    yield next;
  } else {
    this.throw(401);
  }
}

export default new Resource('user', {
  // GET /user
  *index() {
    this.body = yield User.findAll();
  },

  // GET /user/:user
  *show() {
    const user = yield User.findOne({
      where: { username: this.params.user },
      order: [[Rice, 'createdAt', 'DESC']],
      include: [
        {
          model: Rice,
          attributes: ['id', 'title', 'description', 'createdAt'],
          required: false,
          include: [{
            model: Tag,
            attributes: ['name'],
            required: false,
          }],
        },
      ],
    });
    if (!user) {
      this.throw(404);
    }
    this.type = 'json';
    this.status = 200;
    this.body = user;
  },

  // PUT /user/:user
  update: [requireAuth, function *create() {
    const body = yield parse.json(this);
    const rule = {
      postId: { type: 'number', required: true },
    };
    const errors = parameter.validate(rule, body);
    if (errors) {
      this.type = 'json';
      this.status = 200;
      this.body = { error: errors[0] };
      return;
    }
    try {
      const rice = yield Rice.findOne({ where: { id: body.postId } });
      if (!rice) {
        this.throw(403);
      }
      const user = yield User.findOne({ where: { username: this.params.user } });
      if (!user) {
        this.throw(403);
      }
      yield user.addLikedRice(rice);
      this.status = 204;
    } catch (err) {
      debug(err);
      this.throw(403);
    }
  }],

  // DELETE /user/:user
  destroy: [requireAuth, function *destroy() {
    const body = yield parse.json(this);
    const rule = {
      postId: { type: 'number', required: true },
    };
    const errors = parameter.validate(rule, body);
    if (errors) {
      this.type = 'json';
      this.status = 200;
      this.body = { error: errors[0] };
      return;
    }
    try {
      const rice = yield Rice.findOne({ where: { id: body.postId } });
      if (!rice) {
        this.throw(403);
      }
      const user = yield User.findOne({ where: { username: this.params.user } });
      if (!user) {
        this.throw(403);
      }
      yield user.removeLikedRice(rice);
      this.status = 204;
    } catch (err) {
      this.throw(403);
    }
  }],
});
