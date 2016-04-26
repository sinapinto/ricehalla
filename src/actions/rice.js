import fetch from 'isomorphic-fetch';
import jwtDecode from 'jwt-decode';
import cookie from '../utils/cookie';
import API_BASE from '../utils/APIBase';

export const LOAD_RICE_REQUEST = 'LOAD_RICE_REQUEST';
export const LOAD_RICE_SUCCESS = 'LOAD_RICE_SUCCESS';
export const LOAD_RICE_FAILURE = 'LOAD_RICE_FAILURE';
export const POST_RICE_REQUEST = 'POST_RICE_REQUEST';
export const POST_RICE_SUCCESS = 'POST_RICE_SUCCESS';
export const POST_RICE_FAILURE = 'POST_RICE_FAILURE';

function get(id) {
  return fetch(`${API_BASE}/api/v1/rice/${id}`)
  .then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
    throw new Error('an error occured');
  })
  .then(res => res.json());
}

function post(body, token) {
  return fetch(`${API_BASE}/api/v1/rice`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
  .then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
    throw new Error('an error occured');
  })
  .then(res => res.json());
}

export function load(id) {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_RICE_REQUEST });
      const loadedRice = await get(id);
      dispatch({ type: LOAD_RICE_SUCCESS, loadedRice });
    } catch (err) {
      dispatch({ type: LOAD_RICE_FAILURE, error: err.message });
    }
  };
}

export function submit(body) {
  return async dispatch => {
    try {
      dispatch({ type: POST_RICE_REQUEST });
      const token = cookie.get('token');
      if (!jwtDecode(token).username) {
        throw new Error('invalid token');
      }
      const submittedRice = await post(body, token);
      dispatch({ type: POST_RICE_SUCCESS, submittedRice });
    } catch (err) {
      dispatch({ type: POST_RICE_FAILURE, error: err.message || err });
    }
  };
}
