import fetch from 'isomorphic-fetch';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import cookie from '../utils/cookie';
import handleResponse from '../utils/fetchHandler';
import API_BASE from '../utils/APIBase';
import { SET_NOTICE } from './notice';

export const SUBMIT_POST_REQUEST = 'SUBMIT_POST_REQUEST';
export const SUBMIT_POST_SUCCESS = 'SUBMIT_POST_SUCCESS';
export const SUBMIT_POST_FAILURE = 'SUBMIT_POST_FAILURE';

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

export function submitPost(body) {
  return async dispatch => {
    try {
      dispatch({ type: SUBMIT_POST_REQUEST });
      const submitted = await post(body);
      if (submitted.error) {
        dispatch({ type: SUBMIT_POST_FAILURE, error: submitted.error });
      } else {
        dispatch({ type: SUBMIT_POST_SUCCESS, submitted });
        browserHistory.push(`/rice/${submitted.id}`);
        dispatch({
          type: SET_NOTICE,
          level: 'success',
          message: 'Successfully posted your rice!',
        });
      }
    } catch (err) {
      dispatch({ type: SUBMIT_POST_FAILURE, error: err });
    }
  };
}

export const SHOW_POST_REQUEST = 'SHOW_POST_REQUEST';
export const SHOW_POST_SUCCESS = 'SHOW_POST_SUCCESS';
export const SHOW_POST_FAILURE = 'SHOW_POST_FAILURE';

function get(id) {
  return fetch(`${API_BASE}/api/v1/rice/${id}`)
    .then(handleResponse);
}

export function showPost(id) {
  return async dispatch => {
    try {
      dispatch({ type: SHOW_POST_REQUEST });
      const detail = await get(id);
      dispatch({ type: SHOW_POST_SUCCESS, detail });
    } catch (err) {
      dispatch({ type: SHOW_POST_FAILURE, error: err });
    }
  };
}

export const LIST_POST_REQUEST = 'LIST_POST_REQUEST';
export const LIST_POST_SUCCESS = 'LIST_POST_SUCCESS';
export const LIST_POST_FAILURE = 'LIST_POST_FAILURE';

function list(queryString = '') {
  return fetch(`${API_BASE}/api/v1/rice${queryString}`)
    .then(handleResponse);
}

export function fetchList(queryString) {
  return async dispatch => {
    try {
      dispatch({ type: LIST_POST_REQUEST });
      const riceList = await list(queryString);
      dispatch({ type: LIST_POST_SUCCESS, list: riceList });
    } catch (err) {
      dispatch({ type: LIST_POST_FAILURE, error: err });
    }
  };
}

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

function destroy(id, token) {
  return fetch(`${API_BASE}/api/v1/rice/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(handleResponse);
}

export function deletePost(id) {
  return async dispatch => {
    if (!id) {
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
      dispatch({ type: DELETE_POST_REQUEST });
      await destroy(id, token);
      dispatch({ type: DELETE_POST_SUCCESS, id });
      browserHistory.push('/');
      dispatch({
        type: SET_NOTICE,
        level: 'success',
        message: 'Successfully deleted your rice!',
      });
    } catch (err) {
      dispatch({ type: DELETE_POST_FAILURE, error: err });
    }
  };
}


export const SEARCH_POST_REQUEST = 'SEARCH_POST_REQUEST';
export const SEARCH_POST_SUCCESS = 'SEARCH_POST_SUCCESS';
export const SEARCH_POST_FAILURE = 'SEARCH_POST_FAILURE';

export function searchPosts(queryString) {
  return async dispatch => {
    try {
      dispatch({ type: SEARCH_POST_REQUEST });
      const results = await list(queryString);
      dispatch({ type: SEARCH_POST_SUCCESS, results });
    } catch (err) {
      dispatch({ type: SEARCH_POST_FAILURE, error: err });
    }
  };
}

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

async function putLike(username, postId, token) {
  return fetch(`${API_BASE}/api/v1/user/${username}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ postId: +postId }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error;
    }
    return response;
  });
}

export function likePost(postId) {
  return async dispatch => {
    if (!postId) {
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
        type: LIKE_POST_REQUEST,
        username,
        postId,
      });
      const res = await putLike(username, postId, token);
      if (res.status === 204) {
        dispatch({ type: LIKE_POST_SUCCESS });
      } else {
        dispatch({
          type: LIKE_POST_FAILURE,
          username,
          postId,
          error: res.error,
        });
      }
    } catch (err) {
      dispatch({
        type: LIKE_POST_FAILURE,
        username,
        postId,
        error: err,
      });
    }
  };
}

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

async function deleteLike(username, postId, token) {
  return fetch(`${API_BASE}/api/v1/user/${username}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ postId: +postId }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error;
    }
    return response;
  });
}

export function unlikePost(postId) {
  return async dispatch => {
    if (!postId) {
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
        type: UNLIKE_POST_REQUEST,
        username,
        postId,
      });
      const res = await deleteLike(username, postId, token);
      if (res.status === 204) {
        dispatch({ type: UNLIKE_POST_SUCCESS });
      } else {
        dispatch({
          type: UNLIKE_POST_FAILURE,
          username,
          postId,
          error: res.error,
        });
      }
    } catch (err) {
      dispatch({
        type: UNLIKE_POST_FAILURE,
        username,
        postId,
        error: err,
      });
    }
  };
}
