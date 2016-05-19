import fetch from 'isomorphic-fetch';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import cookie from '../utils/cookie';
import handleResponse from '../utils/fetchHandler';
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
  .then(handleResponse);
}

export function submit(body) {
  return async dispatch => {
    try {
      dispatch({ type: POST_RICE_REQUEST });
      const submitted = await post(body);
      if (submitted.error) {
        dispatch({ type: POST_RICE_FAILURE, error: submitted.error });
      } else {
        dispatch({ type: POST_RICE_SUCCESS, submitted });
        browserHistory.push(`/rice/${submitted.id}`);
      }
    } catch (err) {
      dispatch({ type: POST_RICE_FAILURE, error: err });
    }
  };
}

export const SHOW_RICE_REQUEST = 'SHOW_RICE_REQUEST';
export const SHOW_RICE_SUCCESS = 'SHOW_RICE_SUCCESS';
export const SHOW_RICE_FAILURE = 'SHOW_RICE_FAILURE';

function get(id) {
  return fetch(`${API_BASE}/api/v1/rice/${id}`)
    .then(handleResponse);
}

export function showRice(id) {
  return async dispatch => {
    try {
      dispatch({ type: SHOW_RICE_REQUEST });
      const detail = await get(id);
      dispatch({ type: SHOW_RICE_SUCCESS, detail });
    } catch (err) {
      dispatch({ type: SHOW_RICE_FAILURE, error: err });
    }
  };
}

export const LIST_RICE_REQUEST = 'LIST_RICE_REQUEST';
export const LIST_RICE_SUCCESS = 'LIST_RICE_SUCCESS';
export const LIST_RICE_FAILURE = 'LIST_RICE_FAILURE';

function list(queryParams = '') {
  return fetch(`${API_BASE}/api/v1/rice/${queryParams}`)
    .then(handleResponse);
}

export function fetchList() {
  return async dispatch => {
    try {
      dispatch({ type: LIST_RICE_REQUEST });
      const riceList = await list();
      dispatch({ type: LIST_RICE_SUCCESS, list: riceList });
    } catch (err) {
      dispatch({ type: LIST_RICE_FAILURE, error: err });
    }
  };
}

export const LIKE_RICE_REQUEST = 'LIKE_RICE_REQUEST';
export const LIKE_RICE_SUCCESS = 'LIKE_RICE_SUCCESS';
export const LIKE_RICE_FAILURE = 'LIKE_RICE_FAILURE';

async function putLike(username, riceId, token) {
  return fetch(`${API_BASE}/api/v1/user/${username}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ riceId: +riceId }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error;
    }
    return response;
  });
}

export function likeRice(riceId) {
  return async dispatch => {
    if (!riceId) {
      return;
    }
    let token = cookie.get('token');
    if (!token) {
      return;
    }
    let username = jwtDecode(token).username;
    if (!username) {
      return;
    }
    try {
      dispatch({
        type: LIKE_RICE_REQUEST,
        username,
        riceId,
      });
      const res = await putLike(username, riceId, token);
      if (res.status === 204) {
        dispatch({ type: LIKE_RICE_SUCCESS });
      } else {
        dispatch({
          type: LIKE_RICE_FAILURE,
          username,
          riceId,
          error: res.error,
        });
      }
    } catch (err) {
      dispatch({
        type: LIKE_RICE_FAILURE,
        username,
        riceId,
        error: err,
      });
    }
  };
}

export const UNLIKE_RICE_REQUEST = 'UNLIKE_RICE_REQUEST';
export const UNLIKE_RICE_SUCCESS = 'UNLIKE_RICE_SUCCESS';
export const UNLIKE_RICE_FAILURE = 'UNLIKE_RICE_FAILURE';

async function deleteLike(username, riceId, token) {
  return fetch(`${API_BASE}/api/v1/user/${username}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ riceId: +riceId }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error;
    }
    return response;
  });
}

export function unlikeRice(riceId) {
  return async dispatch => {
    if (!riceId) {
      return;
    }
    let token = cookie.get('token');
    if (!token) {
      return;
    }
    let username = jwtDecode(token).username;
    if (!username) {
      return;
    }
    try {
      dispatch({
        type: UNLIKE_RICE_REQUEST,
        username,
        riceId,
      });
      const res = await deleteLike(username, riceId, token);
      if (res.status === 204) {
        dispatch({ type: UNLIKE_RICE_SUCCESS });
      } else {
        dispatch({
          type: UNLIKE_RICE_FAILURE,
          username,
          riceId,
          error: res.error,
        });
      }
    } catch (err) {
      dispatch({
        type: UNLIKE_RICE_FAILURE,
        username,
        riceId,
        error: err,
      });
    }
  };
}
