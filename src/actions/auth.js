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
    errorMessage: error.message || 'something went wrong',
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
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        username,
        token: response.token,
      });
      cookie.set({
        key: 'token',
        value: response.token,
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
