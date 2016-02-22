import * as ActionTypes from '../actions/auth';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  token: null,
  loginError: '',
  registerError: '',
};

export default function (state = initialState, action) {
  // merge the (incomplete) initial state from server
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
        loginError: '',
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...initializedState,
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        loginError: '',
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...initializedState,
        isFetching: false,
        isAuthenticated: false,
        token: null,
        loginError: action.error,
      };
    case ActionTypes.REGISTER_REQUEST:
      return {
        ...initializedState,
        isFetching: true,
      };
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...initializedState,
        isFetching: false,
        loginError: '',
      };
    case ActionTypes.REGISTER_FAILURE:
      return {
        ...initializedState,
        isFetching: false,
        registerError: action.error,
      };
    case ActionTypes.LOGOUT:
      return {
        ...initializedState,
        isAuthenticated: false,
        token: null,
      };
    default:
      return initializedState;
  }
}
