import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  API_BASE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  login,
  logout
} from '../../src/actions/auth.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates LOGOUT_REQUEST when logging out', (done) => {
    nock(`http:${API_BASE}`)
      .post('/auth/logout')
      .reply(204);
    const expectedActions = [
      { type: LOGOUT_REQUEST },
    ];
    const store = mockStore({}, expectedActions, done);
    store.dispatch(logout());
  });

  it('creates LOGIN_SUCCESS when logging in has been done', (done) => {
    nock(`http:${API_BASE}`)
      .post('/auth/login')
      .reply(201, { token: 'token' });
    const expectedActions = [
      { type: LOGIN_REQUEST },
      {
        type: LOGIN_SUCCESS,
        username: 'aa',
        token: 'token',
      },
    ];
    const store = mockStore({}, expectedActions, done);
    store.dispatch(login({ username: 'aa', password: 'bb' }));
  });
});
