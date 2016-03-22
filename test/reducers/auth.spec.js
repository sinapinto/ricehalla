import expect from 'expect';
import * as ActionTypes from '../../src/actions/auth';
import reducer from '../../src/reducers/auth';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      isFetching: false,
      isAuthenticated: false,
      token: null,
      loginInvalid: false,
      registerError: '',
      hydrated: true
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(
      reducer([], {
        type: ActionTypes.LOGIN_REQUEST
      })
    ).toEqual({
      isFetching: true,
      isAuthenticated: false,
      token: null,
      loginInvalid: false,
      registerError: '',
      hydrated: true
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    expect(
      reducer([], {
        type: ActionTypes.LOGIN_FAILURE,
      })
    ).toEqual({
      isFetching: false,
      isAuthenticated: false,
      token: null,
      loginInvalid: true,
      registerError: '',
      hydrated: true
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    expect(
      reducer([], {
        type: ActionTypes.LOGIN_SUCCESS,
        token: 'token'
      })
    ).toEqual({
      isFetching: false,
      isAuthenticated: true,
      token: 'token',
      loginInvalid: false,
      registerError: '',
      hydrated: true
    });
  });
});
