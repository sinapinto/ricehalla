import * as ActionTypes from '../actions';

const initialState = {
  loggingIn: false,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: 'bob',
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error,
      };
    default:
      return state;
  }
}
