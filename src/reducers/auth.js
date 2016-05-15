import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  CLEAR_AUTH_ERRORS,
} from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  token: null,
  loginInvalid: false,
  logoutError: null,
  registerError: '',
  isFetching: false,
};

export default function (state = initialState, action) {
  // merge the partial initial state from server
  let initializedState = Object.assign({}, state);
  if (!state.hydrated) {
    initializedState = Object.assign({}, initialState, state, {
      hydrated: true,
    });
  }

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...initializedState,
        isFetching: true,
        loginInvalid: false,
        token: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...initializedState,
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        loginInvalid: false,
      };
    case LOGIN_FAILURE:
      return {
        ...initializedState,
        isFetching: false,
        isAuthenticated: false,
        loginInvalid: true,
      };
    case REGISTER_REQUEST:
      return {
        ...initializedState,
        isFetching: true,
        registerError: '',
      };
    case REGISTER_SUCCESS:
      return {
        ...initializedState,
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        registerError: '',
      };
    case REGISTER_FAILURE:
      return {
        ...initializedState,
        isFetching: false,
        registerError: action.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...initializedState,
        isAuthenticated: false,
        token: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...initializedState,
        logoutError: action.error,
      };
    case CLEAR_AUTH_ERRORS:
      return {
        ...state,
        logoutError: null,
        registerError: '',
        loginInvalid: false,
      };
    default:
      return initializedState;
  }
}
