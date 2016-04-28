import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
} from '../actions/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  token: null,
  loginInvalid: false,
  registerError: '',
};

export default function (state = initialState, action) {
  // merge the partial initial state from server
  let initializedState = { ...state };
  if (!state.hydrated) {
    initializedState = {
      ...initialState,
      ...state,
      hydrated: true
    };
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
        token: action.response.token,
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
        logoutError: action.error
      };
    default:
      return initializedState;
  }
}
