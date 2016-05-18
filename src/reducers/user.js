import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../actions/user';
import SHOW_RICE_SUCCESS from '../actions/rice';

const initialState = {
  users: {}, // by username
  isFetching: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: {
          ...state.users,
          [action.user.username]: action.user,
        },
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case SHOW_RICE_SUCCESS: {
      const user = state.users[action.detail.User.username];
      if (!user) {
        return state;
      }
      return {
        ...state,
        users: {
          ...state.users,
          [action.detail.User.username]: user.Rice.concat(action.detail),
        },
      };
    }
    default:
      return state;
  }
}
