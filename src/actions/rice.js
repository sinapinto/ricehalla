import fetch from 'isomorphic-fetch';

const API_BASE = `//${__HOST__}:${__PORT__}`;

export const LOAD_RICE_REQUEST = 'LOAD_RICE_REQUEST';
export const LOAD_RICE_SUCCESS = 'LOAD_RICE_SUCCESS';
export const LOAD_RICE_FAILURE = 'LOAD_RICE_FAILURE';
export const POST_RICE_REQUEST = 'POST_RICE_REQUEST';
export const POST_RICE_SUCCESS = 'POST_RICE_SUCCESS';
export const POST_RICE_FAILURE = 'POST_RICE_FAILURE';

function get() {
  return fetch(`${API_BASE}/api/v1/rice`)
  .then(res => {
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
    throw new Error('an error occured');
  })
  .then(res => res.json());
}

function submit(body, token) {
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

export function loadRice() {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_RICE_REQUEST });
      await get();
      dispatch({
        type: LOAD_RICE_SUCCESS,
      });
    } catch (err) {
      dispatch({ type: LOAD_RICE_FAILURE, error: err.message });
    }
  };
}

export function submitRice() {
  return async dispatch => {
    try {
      dispatch({ type: POST_RICE_REQUEST });
      await submit();
      dispatch({
        type: POST_RICE_SUCCESS,
      });
    } catch (err) {
      dispatch({ type: POST_RICE_FAILURE, error: err.message });
    }
  };
}
