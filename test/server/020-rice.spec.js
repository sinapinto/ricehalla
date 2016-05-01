import app from '../../src/server';
import db from '../../src/server/db';
import { expect } from 'chai';
const request = require('co-supertest').agent(app.listen());

before(function *() {
  yield db.sequelize.sync();
});

after(function () {
  db.sequelize.close();
});

xdescribe('rice API', function () {
  describe('GET /api/v1/rice', function () {
    it('respond with json', function (done){
      request
        .get('/api/v1/rice')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /api/v1/rice', function () {
    it('requires title', function (done) {
      db.Rice.sync().then(function () {
        db.Rice.create({ title: 'aa' }).then(function () {
          request
            .post('/api/v1/rice')
            .send({})
            .expect(400, done);
        })
      });
    });

    it('creates a new rice entry', function (done) {
      request
        .post('/api/v1/rice')
        .set('Content-Type', 'application/json')
        .send({ title: 'yo' })
        .expect(201, { id: 3, title: 'yo' }, done);
    });
  });

  describe('GET /api/v1/rice/:rice', function () {
    it('404 when rice doesn\'t exist', function (done){
      request
        .get('/api/v1/rice/999')
        .set('Accept', 'application/json')
        .expect(404, done);
    });

    it('returns rice', function (done){
      request
        .post('/api/v1/rice')
        .set('Content-Type', 'application/json')
        .send({ title: 'brown' })
        .expect(201, { id: 1, title: "brown" });
      request
        .get('/api/v1/rice/1')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });
});

describe('rice DB', function () {
  const user = {
    username: 'trump',
    email: 'donald@trump.com',
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

    it('item', function *() {
      yield db.Rice.sync();
      const r = yield db.Rice.create(rice);
      expect(r.title).equal(rice.title);
    });
  });

  describe('read', function () {
    it('item', function *() {
      const r = yield db.Rice.findOne({
        where: { userId: 1 },
        include: [
          {
            model: db.User,
            attributes: ['username'],
          }
        ],
        // raw: true
      });
      expect(r.title).equal(rice.title);
      expect(r.User.username).equal(user.username);
    });
  });

  describe('update', function () {
    it('item', function *() {
      const newTitle = { 'description': 'new description' };
      const a = yield db.Rice.findOne({ where: { userId: 1 } });
      const r = yield a.update(newTitle);
      expect(r.description).equal(newTitle.description);
    });
  });

  xdescribe('delete', function () {
    it('item', function *() {
      const a = yield db.Rice.findOne({ where: { userId: 1 } });
      const r = yield a.destroy();
      expect(r.title).equal(rice.title);
    });
  });
});
