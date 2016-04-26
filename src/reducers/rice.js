import * as ActionTypes from '../actions/rice';

const initialState = {
  isFetching: false,
  id: null,
  title: null,
  description: null,
  loaded: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.POST_RICE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.POST_RICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.submittedRice,
      };
    case ActionTypes.POST_RICE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ActionTypes.LOAD_RICE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.LOAD_RICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loaded: {
          ...action.loadedRice,
        },
      };
    case ActionTypes.LOAD_RICE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
