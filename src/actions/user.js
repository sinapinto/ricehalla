import fetch from 'isomorphic-fetch';
import cookie from '../utils/cookie';
import handleResponse from '../utils/fetchHandler';
import API_BASE from '../utils/APIBase';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

async function get(username, token) {
  return fetch(`${API_BASE}/api/v1/user/${username}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then(handleResponse);
}


export function loadUser(username) {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
      const token = cookie.get('token');
      if (!username || typeof username !== 'string') {
        throw new Error('Invalid username');
      }
      const res = await get(username, token);
      dispatch({
        type: LOAD_USER_SUCCESS,
        user: res,
      });
    } catch (err) {
      dispatch({ type: LOAD_USER_FAILURE, error: err.message });
    }
  };
}
