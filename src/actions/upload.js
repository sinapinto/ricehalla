import fetch from 'isomorphic-fetch';
import jwtDecode from 'jwt-decode';
import cookie from '../utils/cookie';

const API_BASE = `//${__HOST__}:${__PORT__}`;

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

function post(file, token) {
  return fetch(`${API_BASE}/api/v1/upload`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: file
  })
  .then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
    throw new Error('an error occured');
  })
  .then(res => res.json());
}

export function upload(file) {
  return async dispatch => {
    try {
      dispatch({ type: UPLOAD_REQUEST });
      const token = cookie.get('token');
      if (!jwtDecode(token).username) {
        throw new Error('invalid token');
      }
      const res = await post(file, token);
      dispatch({ type: UPLOAD_SUCCESS, response: res.response });
    } catch (err) {
      dispatch({ type: UPLOAD_FAILURE, error: err.message });
    }
  };
}
