import app from '../../src/server';
import db from '../../src/server/db/';
import { expect } from 'chai';
const request = require('co-supertest').agent(app.listen());

before(function *() {
  yield db.sequelize.sync();
});

after(function () {
  db.sequelize.close();
});

describe('rice API', function () {
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
        .expect(201, { id: 3, title: "yo" }, done);
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
    password: 'america123',
    passwordHash: '892N938CUNU298UFFFFEWAIJF',
    email: 'donald@trump.com',
  };

  const rice = {
    uid: '86198aa7-5e28-4182-9ac3-ce2de327a040',
    title: 'make america great again',
  };

  describe('create', function () {
    it('create new user', function *() {
      yield db.User.sync();
      const u = db.User.create(user);
      expect(u.email).equal(user.email);
    });

    it('create an item', function *() {
      yield db.Rice.sync();
      const r = db.Rice.create(rice);
      expect(r.title).equal(rice.title);
    });
  });

  describe('read', function () {
    it('read an item', function *() {
      const p = yield db.Rice.load(hid);
      expect(p.title).equal(rice.title);
    })
  });

  describe('update', function () {
    it('update an item', function *() {
      const newTitle = { 'title': 'new title' };
      const p = yield db.Rice.update(rice.uid, newTitle);
      expect(p.title).equal(newTitle.title);
    })
  });

  describe('delete', function () {
    it('delete an item', function *() {
      const p = yield db.Rice.destroy(rice.uid);
      expect(p.title).equal(rice.title);
    })
  });
});
