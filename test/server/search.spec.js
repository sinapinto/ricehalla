import app from '../../src/server';
import db from '../../src/server/db/';
const request = require('supertest').agent(app.listen());

before(function () {
  return db.sequelize.sync({ force: true });
});

after(function () {
  db.sequelize.close();
});

describe('GET /api/v1/search', function () {

  it('sends 200 for no match', function (done) {
    request
    .get('/api/v1/search')
    .set('Content-Type', 'application/json')
    .query({ q: 'wsdfjkl' })
    .expect(200, [], done);
  });

  it('finds a match', function (done) {
    db.Rice.sync({ force: true }).then(function () {
      db.Rice.create({ title: 'wow' }).then(function () {
        request
        .get('/api/v1/search')
        .query({ q: 'w' })
        .expect(200, done);
      })
    });
  });

});
