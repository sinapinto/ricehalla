import { CALL_API } from '../middleware/api';

export const COUNTER_REQUEST = 'COUNTER_REQUEST';
export const COUNTER_SUCCESS = 'COUNTER_SUCCESS';
export const COUNTER_FAILURE = 'COUNTER_FAILURE';

function fetchCounter() {
  return {
    [CALL_API]: {
      types: [COUNTER_REQUEST, COUNTER_SUCCESS, COUNTER_FAILURE],
      endpoint: 'api/counter'
    }
  };
}

export function loadCounter() {
  return dispatch => {
    return dispatch(fetchCounter());
  };
}
