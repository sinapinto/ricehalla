import app from '../../src/server';
import { Tag, User, Rice, sequelize } from '../../src/server/db';
import { expect } from 'chai';

before(function *() {
  yield sequelize.sync({ force: true });
});

after(function () {
  sequelize.close();
});

describe('DB: tag', function () {
  const tag = {
    name: 'name',
  };

  const user = {
    username: 'user',
    email: 'user@a.com',
    emailHash: 'emailhash',
    passwordHash: 'passwordhash',
  };

  const rice = {
    userId: 1,
    title: 'title',
    description: 'description',
    files: '["file.jpg"]',
  };

  // instances
  let t, u, r;

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

    it('riceTag', function *() {
      yield r.addTag(t);
    });
  });

  describe('read', function () {
    it('rice tags', function *() {
      const found = yield Rice.findAll({ include: [{ model: Tag }] });
    });

  });

  describe('update', function () {
    it('user', function *() {
      const newName = 'new name';
      const updated = yield u.update({ username: newName });
      expect(updated.username).equal(newName);
    });
  });

});
