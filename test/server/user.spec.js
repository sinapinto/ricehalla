import app from '../../src/server';
import db from '../../src/server/db/';
const request = require('supertest').agent(app.listen());

before(function () {
  return db.sequelize.sync({ force: true });
});

describe('GET /api/v1/user', function () {

  it('respond with json', function (done){
    request
    .get('/api/v1/user')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  })

});

describe('GET /api/v1/user/:user', function () {

  it('returns found user', function (done) {
    db.User.create({ username: 'aa', passwordHash: 'sdf' }).then(function () {
      request
      .get('/api/v1/user/aa')
      .expect(200, done);
    })
  });

  it('404 when user doesnt exist', function (done) {
    request
    .get('/api/v1/user/tupac')
    .expect(404, done);
  });

});
