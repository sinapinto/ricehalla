import app from '../../src/server';
import { Tag, User, Rice, sequelize } from '../../src/server/db';
import { expect } from 'chai';

before(function *() {
  yield sequelize.sync();
});

after(function () {
  sequelize.close();
});

describe('tag DB', function () {
  const tag = {
    name: 'cooltag',
  };

  const user = {
    username: 'user2',
    email: 'user@two.com',
    passwordHash: '23048',
  };

  const rice = {
    userId: 2,
    title: 'title for user2 rice',
    description: 'desc for user2 rice',
    files: '["user2rice.jpg"]',
  };

  // instances
  let t;
  let u;
  let r;

  describe('create', function () {
    it('tag', function *() {
      yield Tag.sync();
      t = yield Tag.create(tag);
      expect(t.name).equal(tag.name);
    });

    it('user', function *() {
      yield User.sync();
      u = yield User.create(user);
      expect(u.email).equal(user.email);
    });

    it('rice', function *() {
      yield Rice.sync();
      r = yield Rice.create(rice);
      expect(r.title).equal(rice.title);
    });

    // it('riceTag', function *() {
    //   yield r.addTag(t);
    // });
  });

  describe('read', function () {
    it('rice tags', function *() {
      const found = yield Rice.findAll({
        include: [
          {
            model: Tag,
          }
        ],
      });
    });

    xit('associated tags', function *() {
      // const found = yield RiceTag.findAll({
      //   where: {
      //     taggableId: r.id,
      //   },
      //   attributes: ['tagId'],
      // });
      // expect(found[0].tagId).equal(t.id);

      // const found = yield Rice.findAll();
      // yield found[0].getTags(); // throws error "no column Tag.taggable"
    });
  });

  xdescribe('update', function () {
    it('user', function *() {
      const newDesc = 'updated desc';
      const updated = yield u.update({ description: newDesc });
      expect(updated.description).equal(newDesc);
    });
  });

});
