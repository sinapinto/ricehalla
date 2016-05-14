import Resource from 'koa-resource-router';
import parse from 'co-body';
import Parameter from 'parameter';
import { User, Rice, Tag } from '../../db';
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
    const body = yield parse(this);
    const rule = {
      riceId: { type: 'number', required: true },
    };
    const errors = parameter.validate(rule, body);
    if (errors) {
      this.type = 'json';
      this.status = 200;
      this.body = { errors };
      return;
    }
    try {
      const rice = yield Rice.findOne({ where: { id: body.riceId }});
      if (!rice) {
        return this.throw(403);
      }
      const user = yield User.findOne({ where: { username: this.params.user }});
      if (!user) {
        return this.throw(403);
      }
      yield user.setLikedRice(rice);
      this.type = 'json';
      this.status = 201;
      this.body = { ok: true };
    } catch (err) {
      this.throw(403);
    }
  }],

  // DELETE /user/:user
  destroy: [requireAuth, function *destroy() {
    const body = yield parse(this);
    const rule = {
      riceId: { type: 'number', required: true },
    };
    const errors = parameter.validate(rule, body);
    if (errors) {
      this.type = 'json';
      this.status = 200;
      this.body = { errors };
      return;
    }
    try {
      const rice = yield Rice.findOne({ where: { id: body.riceId }});
      if (!rice) {
        return this.throw(403);
      }
      const user = yield User.findOne({ where: { username: this.params.user }});
      if (!user) {
        return this.throw(403);
      }
      yield user.removeLikedRice(rice);
      this.type = 'json';
      this.status = 201;
      this.body = { ok: true };
    } catch (err) {
      this.throw(403);
    }
  }],
});
