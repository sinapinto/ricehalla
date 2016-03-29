import app from '../../src/server';
import db from '../../src/server/db/';
const request = require('supertest').agent(app.listen());

before(function () {
  return db.sequelize.sync({ force: true });
});

after(function () {
  db.sequelize.close();
});

describe('GET /api/v1/rice', function () {

  it('respond with json', function (done){
    request
    .get('/api/v1/rice')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  })

});

describe('POST /api/v1/rice', function () {

  it('requires title', function (done) {
    db.Rice.sync({ force: true }).then(function () {
      db.Rice.create({ title: 'aa', tags: ['tag1', 'tag2'] }).then(function () {
        request
        .post('/api/v1/rice')
        .send({ tags: ['tag1', 'tag2'] })
        .expect(400, done);
      })
    });
  });

  it('creates a new rice entry', function (done) {
    request
    .post('/api/v1/rice')
    .set('Content-Type', 'application/json')
    .send({ title: 'yo' })
    .expect(201, { id: 2, title: "yo" }, done);
  });

});
