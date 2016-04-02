import fetch from 'isomorphic-fetch';
import cookie from '../utils/cookie';

export const API_BASE = `//${__HOST__}:${__PORT__}`;

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function auth(endpoint, body) {
  return fetch(`${API_BASE}${endpoint}`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
    throw new Error('Invalid username or password');
  })
  .then(res => res.json());
}

export function login(body) {
  return async dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const res = await auth('/auth/login', body);
      cookie.set('token', res.token);
      dispatch({
        type: LOGIN_SUCCESS,
        username: body.username,
        token: res.token
      });
    } catch (err) {
      dispatch({ type: LOGIN_FAILURE });
    }
  };
}

export function register(body) {
  return async dispatch => {
    try {
      dispatch({ type: REGISTER_REQUEST });
      const res = await auth('/auth/signup', body);
      cookie.set('token', res.token);
      dispatch({
        type: REGISTER_SUCCESS,
        username: body.username,
        token: res.token
      });
    } catch (err) {
      dispatch({ type: REGISTER_FAILURE, error: err.message });
    }
  };
}

export function logout() {
  return async dispatch => {
    try {
      dispatch({ type: LOGOUT_REQUEST });
      cookie.remove('token');
      fetch(`${API_BASE}/auth/logout`);
    } catch (err) {
      dispatch({ type: LOGOUT_FAILURE, error: err.message });
    }
  };
}
