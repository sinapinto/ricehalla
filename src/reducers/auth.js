import * as ActionTypes from '../actions/auth';

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
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...initializedState,
        isFetching: true,
        loginInvalid: false,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...initializedState,
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        loginInvalid: false,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...initializedState,
        isFetching: false,
        isAuthenticated: false,
        token: null,
        loginInvalid: true,
      };
    case ActionTypes.REGISTER_REQUEST:
      return {
        ...initializedState,
        isFetching: true,
        registerError: '',
      };
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...initializedState,
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        registerError: '',
      };
    case ActionTypes.REGISTER_FAILURE:
      return {
        ...initializedState,
        isFetching: false,
        registerError: action.error,
      };
    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...initializedState,
        isAuthenticated: false,
        token: null,
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...initializedState,
        isAuthenticated: false,
        token: null,
        logoutError: action.error
      };
    default:
      return initializedState;
  }
}
