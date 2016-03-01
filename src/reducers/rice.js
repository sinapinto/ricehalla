import * as ActionTypes from '../actions/rice';

const initialState = {
  isFetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.RICE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.RICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.rice,
      };
    case ActionTypes.RICE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

