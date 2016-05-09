import fetch from 'isomorphic-fetch';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import cookie from '../utils/cookie';
import handleErrors from '../utils/fetchErrorHandler';
import API_BASE from '../utils/APIBase';

export const POST_RICE_REQUEST = 'POST_RICE_REQUEST';
export const POST_RICE_SUCCESS = 'POST_RICE_SUCCESS';
export const POST_RICE_FAILURE = 'POST_RICE_FAILURE';

async function post(body) {
  const token = cookie.get('token');
  if (!jwtDecode(token).username) {
    throw new Error('invalid token');
  }
  return fetch(`${API_BASE}/api/v1/rice`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  .then(handleErrors)
  .then(res => res.json());
}

export function submit(body) {
  return async dispatch => {
    try {
      dispatch({ type: POST_RICE_REQUEST });
      const submitted = await post(body);
      if (submitted.errors) {
        dispatch({ type: POST_RICE_FAILURE, errors: submitted.errors });
      } else {
        dispatch({ type: POST_RICE_SUCCESS, submitted });
        browserHistory.push(`/rice/${submitted.id}`);
      }
    } catch (err) {
      dispatch({ type: POST_RICE_FAILURE, errors: err });
    }
  };
}

export const SHOW_RICE_REQUEST = 'SHOW_RICE_REQUEST';
export const SHOW_RICE_SUCCESS = 'SHOW_RICE_SUCCESS';
export const SHOW_RICE_FAILURE = 'SHOW_RICE_FAILURE';

function get(id) {
  return fetch(`${API_BASE}/api/v1/rice/${id}`)
    .then(handleErrors)
    .then(res => res.json());
}

export function show(id) {
  return async dispatch => {
    try {
      dispatch({ type: SHOW_RICE_REQUEST });
      const detail = await get(id);
      dispatch({ type: SHOW_RICE_SUCCESS, detail });
    } catch (err) {
      dispatch({ type: SHOW_RICE_FAILURE, errors: err });
    }
  };
}

export const LIST_RICE_REQUEST = 'LIST_RICE_REQUEST';
export const LIST_RICE_SUCCESS = 'LIST_RICE_SUCCESS';
export const LIST_RICE_FAILURE = 'LIST_RICE_FAILURE';

function list(queryParams = '') {
  return fetch(`${API_BASE}/api/v1/rice/${queryParams}`)
    .then(handleErrors)
    .then(res => res.json());
}

export function fetchList() {
  return async (dispatch, getState) => {
    if (getState().rice.list.length > 0) {
      return null;
    }
    try {
      dispatch({ type: LIST_RICE_REQUEST });
      const riceList = await list();
      dispatch({ type: LIST_RICE_SUCCESS, list: riceList });
    } catch (err) {
      dispatch({ type: LIST_RICE_FAILURE, errors: err });
    }
  };
}

export function fetchPopular() {
  return async dispatch => {
    try {
      dispatch({ type: LIST_RICE_REQUEST });
      const riceList = await list('?order=likes');
      dispatch({ type: LIST_RICE_SUCCESS, list: riceList });
    } catch (err) {
      dispatch({ type: LIST_RICE_FAILURE, errors: err });
    }
  };
}
