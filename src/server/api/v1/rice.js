import Resource from 'koa-resource-router';
import parse from 'co-body';
import Parameter from 'parameter';
import _debug from 'debug';
import { Rice, User, Tag, sequelize } from '../../db';
const debug = _debug('app:server:rice');
const parameter = new Parameter({});

const MAX_TAGS = 15;

function *requireAuth(next) {
  if (this.state.user) {
    yield next;
  } else {
    this.throw(401);
  }
}

export default new Resource('rice', {
  // GET /rice
  index: function *index() {
    try {
      const rice = yield Rice.findAll({
        attributes: [
          'scrot',
          'id',
          // [sequelize.fn('COUNT', sequelize.col('Liker.id')), 'likeCount'],
        ],
        include: [
          // {
          //   model: User,
          //   attributes: ['username'],
          //   required: true,
          // },
          {
            model: User,
            as: 'Liker',
            attributes: ['username'],
          },
          {
            model: Tag,
            attributes: ['name'],
            required: false,
          },
        ],
      });
      this.type = 'json';
      this.status = 200;
      this.body = rice;
    } catch (err) {
      debug(err);
      this.type = 'json';
      this.status = 403;
      this.body = { message: 'failed to get rice' };
    }
  },

  // POST /rice
  create: [requireAuth, function *create() {
    const body = yield parse(this);
    body.userId = +body.userId;
    debug(body);
    const rule = {
      userId: { type: 'number', required: true },
      title: { type: 'string', required: true },
      description: { type: 'string', allowEmpty: true, required: false },
      scrot: { type: 'string', required: true },
      files: { type: 'array', itemType: 'string', required: false },
      tags: { type: 'string', allowEmpty: true, required: false },
    };
    const errors = parameter.validate(rule, body);
    if (body.tags) {
      body.tags = body.tags.split(',', MAX_TAGS).map(tag => tag.substr(0, 15));
    }
    if (errors) {
      this.type = 'json';
      this.status = 200;
      this.body = { error: errors[0] };
      return;
    }
    const fields = [
      'userId',
      'title',
      'description',
      'scrot',
      'files',
    ];
    try {
      body.files = JSON.stringify(body.files);
      const rice = yield Rice.create(body, { fields });

      // create tags
      for (let i = 0; i < body.tags.length; i++) {
        const newTag = yield Tag.create({ name: body.tags[i] });
        yield rice.addTag(newTag);
      }
      this.type = 'json';
      this.status = 201;

      // emulate a "GET /rice" response to save an additional request
      if (body.tags) {
        rice.Tags = body.tags.map(tag => ({ name: tag }));
      }
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
      attributes: [
        'id',
        'title',
        'description',
        'files',
        'scrot',
        // [sequelize.fn('COUNT', sequelize.col('Liker.id')), 'likeCount'],
      ],
      include: [
        {
          model: User,
          attributes: ['username', 'emailHash'],
          required: true,
        },
        {
          model: User,
          as: 'Liker',
        },
        {
          model: Tag,
          attributes: ['name'],
          required: false,
        },
      ],
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
  // destroy: [requireAuth, function *destroy() {
  //   const found = yield Rice.findOne({
  //     where: { id: this.params.rice },
  //   });
  //   if (!found) {
  //     this.throw(404);
  //   }
  //   const rice = yield found.destroy();
  //   this.type = 'json';
  //   this.status = 200;
  //   this.body = rice;
  // }],
});
