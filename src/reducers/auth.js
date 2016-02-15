import * as ActionTypes from '../actions/auth';
import jwtDecode from 'jwt-decode';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  username: null,
  token: null,
  statusText: '',
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
        username: jwtDecode(action.token).username,
        token: action.token,
        statusText: 'Logged in',
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        username: null,
        token: null,
        statusText: `Authentication error: ${action.errorMessage}`,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        token: null,
      };
    default:
      return state;
  }
}
