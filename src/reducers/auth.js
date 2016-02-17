import * as ActionTypes from '../actions/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  token: null,
  loginError: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        loginError: '',
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        token: null,
        loginError: action.error,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
}
