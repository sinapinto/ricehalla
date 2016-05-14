import app from '../../src/server';
import { User, Rice, RiceLikedByUser, sequelize } from '../../src/server/db';
import { expect } from 'chai';

before(function () {
  return sequelize.sync({ force: true });
});

after(function () {
  sequelize.close();
});

describe('DB: like', function () {
  const user = {
    username: 'liker',
    email: 'liker@a.com',
    emailHash: 'emailhash',
    passwordHash: 'passwordhash',
  };

  const rice = {
    userId: 1,
    title: 'ttt',
    description: 'ddd',
    files: 'fff',
  };

  // instances
  let u, r;

  describe('create', function () {
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

    it('like', function *() {
      yield r.setLiker(u);
      // yield u.setLikedRice(r);
    });
  });

  describe('read', function () {
    it('liker', function *() {
      const found = yield Rice.findOne({
        where: { title: rice.title },
        include: [
          { model: User, as: 'Liker' }
        ],
      });
      expect(found.Liker[0].username).equal(user.username);
    });
  });

});
