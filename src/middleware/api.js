import fetch from 'isomorphic-fetch';

const API_ROOT = 'http://localhost:3000/';

export const CALL_API = Symbol('CALL_API');

/* eslint-disable no-unused-vars */
export default store => next => action => {
/* eslint-enable no-unused-vars */
  const { [CALL_API]: callAPI, ...rest } = action;
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, types } = callAPI;

  if (typeof endpoint !== 'string') {
    throw new Error('Expected a string endpoint');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three types');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected types to be strings');
  }

  const fullURL = API_ROOT + endpoint;

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });

  return fetch(fullURL)
    .then(response => response.json())
    .then(
      json => next({ ...rest, type: SUCCESS, ...json }),
      error => next({ ...rest, type: FAILURE, error })
    );
};
