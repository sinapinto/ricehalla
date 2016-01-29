import * as ActionTypes from '../actions';

const initialState = {
  magic: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.COUNTER_REQUEST:
      return {
        ...state,
        magic: 10,
      };
    case ActionTypes.COUNTER_SUCCESS:
      return {
        ...state,
        magic: 20,
      };
    case ActionTypes.COUNTER_FAILURE:
      return {
        ...state,
        magic: 30,
      };
    default:
      return state;
  }
}
