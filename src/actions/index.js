import { CALL_API } from '../middleware/api';

/**
 * The "types" array will be used by the api middleware to be
 * able to dispatch actions of different types.
 */

export const BATTLE_REQUEST = 'BATTLE_REQUEST';
export const BATTLE_SUCCESS = 'BATTLE_SUCCESS';
export const BATTLE_FAILURE = 'BATTLE_FAILURE';

function fetchBattle(id = '') {
  return {
    [CALL_API]: {
      types: [BATTLE_REQUEST, BATTLE_SUCCESS, BATTLE_FAILURE],
      endpoint: `api/battles/${id}`,
    },
  };
}

export function loadBattle(id) {
  return dispatch => dispatch(fetchBattle(id));
}

export const RESET_ERROR = 'RESET_ERROR';

export function resetErrorMessage() {
  return {
    type: RESET_ERROR,
  }
}
