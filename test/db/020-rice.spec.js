import app from '../../src/server';
import db from '../../src/server/db';
import { expect } from 'chai';

before(function *() {
  yield db.sequelize.sync();
});

after(function () {
  db.sequelize.close();
});

describe('DB: rice', function () {
  const user = {
    username: 'trump',
    email: 'donald@trump.com',
    emailHash: 'emailhashslfjdsldkfj',
    passwordHash: '892N938CUNU298UFFFFEWAIJF',
  };

  const rice = {
    userId: 1,
    title: 'make america great again',
    description: 'build a wall and make mexico pay for it',
    files: '["file.jpg"]',
  };

  describe('create', function () {
    it('user', function *() {
      yield db.User.sync();
      const u = yield db.User.create(user);
      expect(u.email).equal(user.email);
      expect(u.id).equal(rice.userId);
    });

    it('rice', function *() {
      yield db.Rice.sync();
      const r = yield db.Rice.create(rice);
      expect(r.title).equal(rice.title);
    });
  });

  describe('read', function () {
    it('rice', function *() {
      const r = yield db.Rice.findOne({
        where: { userId: 1 },
        include: [
          {
            model: db.User,
            attributes: ['username'],
          }
        ],
      });
      expect(r.title).equal(rice.title);
      expect(r.User.username).equal(user.username);
    });
  });

  describe('update', function () {
    it('rice', function *() {
      const newTitle = { 'description': 'new description' };
      const a = yield db.Rice.findOne({ where: { userId: 1 } });
      const r = yield a.update(newTitle);
      expect(r.description).equal(newTitle.description);
    });
  });

  describe('delete', function () {
    it('rice', function *() {
      const a = yield db.Rice.findOne({ where: { userId: 1 } });
      const r = yield a.destroy();
      expect(r.title).equal(rice.title);
    });

    it('user', function *() {
      const a = yield db.User.findOne({ where: { username: user.username } });
      const u = yield a.destroy();
      expect(u.username).equal(user.username);
    });
  });
});
