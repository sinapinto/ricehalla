import * as ActionTypes from '../actions/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  token: null,
  loginError: '',
  registerError: '',
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
    case ActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loginError: '',
      };
    case ActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        registerError: action.error,
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
