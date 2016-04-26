import * as ActionTypes from '../actions/user';

const initialState = {
  isFetching: false,
  file: '',
  title: '',
  description: '',
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...action.user,
      };
    case ActionTypes.LOAD_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
