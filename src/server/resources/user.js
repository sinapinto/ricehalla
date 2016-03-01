import Resource from 'koa-resource-router';
import { User } from '../db';

export default new Resource('user', {
  // GET /user
  *index() {
  },

  // GET /user/new
  *new() {
  },

  // POST /user
  *create() {
  },

  // GET /user/:user
  *show() {
    this.body = yield User.findOne({ where: { username: this.params.user } });
  },

  // GET /user/:user/edit
  *edit() {
  },

  // PUT /user/:user
  *update() {
  },

  // DELETE /user/:user
  *destroy() {
  }
});
