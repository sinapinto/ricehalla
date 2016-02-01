import { CALL_API } from '../middleware/api';

export const BATTLE_REQUEST = 'BATTLE_REQUEST';
export const BATTLE_SUCCESS = 'BATTLE_SUCCESS';
export const BATTLE_FAILURE = 'BATTLE_FAILURE';

/**
 * The "types" array will be used by the api middleware to be
 * able to dispatch actions of different types.
 */

function fetchBattle(id) {
  return {
    [CALL_API]: {
      types: [BATTLE_REQUEST, BATTLE_SUCCESS, BATTLE_FAILURE],
      endpoint: `api/battle/${id}`,
    },
  };
}

export function loadBattle(id) {
  return dispatch => dispatch(fetchBattle(id));
}
