import fetch from 'isomorphic-fetch';
import handleResponse from '../utils/fetchHandler';
import API_BASE from '../utils/APIBase';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

async function get(username) {
  return fetch(`${API_BASE}/api/v1/user/${username}`, {
    headers: {
      Accept: 'application/json',
    },
  })
  .then(handleResponse);
}


export function loadUser(username) {
  return async dispatch => {
    if (!username || typeof username !== 'string') {
      throw new Error('Invalid username');
    }
    try {
      dispatch({ type: LOAD_USER_REQUEST });
      const res = await get(username);
      dispatch({
        type: LOAD_USER_SUCCESS,
        user: res,
      });
    } catch (err) {
      dispatch({ type: LOAD_USER_FAILURE, error: err.message });
    }
  };
}
