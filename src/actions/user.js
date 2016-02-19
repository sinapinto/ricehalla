import fetch from 'isomorphic-fetch';

const API_BASE = `http://localhost:${__PORT__}`;

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

function userRequest() {
  return {
    type: USER_REQUEST,
  };
}

function userFailure() {
  return {
    type: USER_FAILURE,
  };
}

export function loadUser() {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    dispatch(userRequest());

    if (!token) {
      dispatch(userFailure());
      return;
    }

    fetch(`${API_BASE}/api/user`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res;
      }
      throw new Error('An error occured');
    })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: USER_SUCCESS,
        user: res.user,
      });
    })
    .catch(() => {
      dispatch(userFailure());
    });
  };
}
