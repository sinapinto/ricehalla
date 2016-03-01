import fetch from 'isomorphic-fetch';

const API_BASE = `//${__HOST__}:${__PORT__}`;

export const RICE_REQUEST = 'RICE_REQUEST';
export const RICE_SUCCESS = 'RICE_SUCCESS';
export const RICE_FAILURE = 'RICE_FAILURE';

function riceRequest() {
  return {
    type: RICE_REQUEST,
  };
}

function riceFailure() {
  return {
    type: RICE_FAILURE,
  };
}

export function loadRice() {
  return (dispatch, getState) => {
    const { auth: { token } } = getState();
    dispatch(riceRequest());

    return fetch(`${API_BASE}/api/v1/rice`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined,
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
        type: RICE_SUCCESS,
        rice: res,
      });
    })
    .catch(() => {
      dispatch(riceFailure());
    });
  };
}

