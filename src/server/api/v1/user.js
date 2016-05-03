import Resource from 'koa-resource-router';
import { User, Rice, Tag } from '../../db';

export default new Resource('user', {
  // GET /user
  *index() {
    this.body = yield User.findAll();
  },

  // GET /user/:user
  *show() {
    const user = yield User.findOne({
      where: { username: this.params.user },
      include: [
        {
          model: Rice,
          attributes: ['title', 'description', 'createdAt'],
          required: false,
          include: [{
            model: Tag,
            attributes: ['name', 'count'],
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
});
