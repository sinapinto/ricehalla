import fetch from 'isomorphic-fetch';

const API_ROOT = 'http://localhost:3000/';

export const CALL_API = Symbol('CALL_API');

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { endpoint, types } = callAPI;

  if (typeof endpoint !== 'string') {
    throw new Error('Expected a string endpoint');
  }

  if (!Array.isArray(types)) {
    throw new Error('Expected an array of types');
  }

  const [requestType, successType, failureType] = types;

  const fullURL = API_ROOT + endpoint;
  next({ type: requestType });

  return fetch(fullURL)
    .then(response => response.json())
    .then(
      json => next({
        type: successType,
        json,
      }),
      error => next({
        type: failureType,
      }));
};
