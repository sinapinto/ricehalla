import * as ActionTypes from '../actions';

const initialState = {
  isFetching: false,
  entities: {},
  ids: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.BATTLE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.BATTLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(parseInt(action.json.response, 10)),
      };
    case ActionTypes.BATTLE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
