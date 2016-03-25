import Resource from 'koa-resource-router';
import { User } from '../../db';

export default new Resource('user', {
  // GET /user
  *index() {
    this.type = 'json';
    this.status = 200;
    this.body = {};
  },

  // POST /user
  *create() {
  },

  // GET /user/:user
  *show() {
    const user = yield User.findOne({
      where: { username: this.params.user }
    });
    if (!user) {
      this.throw(404);
    }
    this.type = 'json';
    this.status = 200;
    this.body = user;
  },

  // PUT /user/:user
  *update() {
  },

  // DELETE /user/:user
  *destroy() {
  }
});
