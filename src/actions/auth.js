import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import cookie from '../utils/cookie.js';

const API_BASE = `http://localhost:${__PORT__}`;

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

function loginError(error) {
  return {
    type: LOGIN_FAILURE,
    error: error.message || 'An unkown error occured. Try again later.',
  };
}

export function login(username, password) {
  return dispatch => {
    dispatch(loginRequest());
    return fetch(`${API_BASE}/auth/login`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res;
      }
      throw new Error('Invalid username or password');
    })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        username,
        token: res.token,
      });
      cookie.set({
        key: 'token',
        value: res.token,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      browserHistory.push('/dashboard');
    })
    .catch(error => {
      dispatch(loginError(error));
    });
  };
}

export const LOGOUT = 'LOGOUT';

export function logout() {
  return dispatch => {
    dispatch({ type: LOGOUT });
    cookie.remove('token');
    browserHistory.push('/');
  };
}
