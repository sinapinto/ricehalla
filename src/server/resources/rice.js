import Resource from 'koa-resource-router';
import { Rice } from '../db';

export default new Resource('rice', {
  // GET /rice
  *index() {
  },

  // GET /rice/new
  *new() {
  },

  // POST /rice
  *create() {
  },

  // GET /rice/:id
  *show() {
    this.body = yield Rice.findOne({ where: { id: this.params.id } });
  },

  // GET /rice/:id/edit
  *edit() {
  },

  // PUT /rice/:id
  *update() {
  },

  // DELETE /rice/:id
  *destroy() {
  }
});

