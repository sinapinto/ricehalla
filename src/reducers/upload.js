import * as ActionTypes from '../actions/upload';

const initialState = {
  isFetching: false,
  error: '',
  response: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPLOAD_REQUEST:
      return {
        ...state,
        isFetching: true,
        response: null,
      };
    case ActionTypes.UPLOAD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        response: action.response,
      };
    case ActionTypes.UPLOAD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
