import fetch from 'isomorphic-fetch';
import cookie from '../utils/cookie';

const API_BASE = `//${__HOST__}:${__PORT__}`;

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    error: message || 'An error occured. Try again later.',
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
    })
    .catch(error => {
      dispatch(loginError(error.message));
    });
  };
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function registerRequest() {
  return {
    type: REGISTER_REQUEST,
  };
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    error: message || 'An error occured. Try again later.',
  };
}

export function register(username, password) {
  return dispatch => {
    dispatch(registerRequest());
    return fetch(`${API_BASE}/auth/signup`, {
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
        type: REGISTER_SUCCESS,
        username,
        token: res.token,
      });
    })
    .catch(error => {
      dispatch(registerError(error.message));
    });
  };
}

export const LOGOUT = 'LOGOUT';

export function logout() {
  return dispatch => {
    dispatch({ type: LOGOUT });
    cookie.remove('token');
    fetch(`${API_BASE}/auth/logout`);
  };
}
