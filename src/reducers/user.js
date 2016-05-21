import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../actions/user';
import SHOW_POST_SUCCESS from '../actions/post';

const initialState = {
  byName: {},
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
        byName: {
          ...state.byName,
          [action.user.username]: action.user,
        },
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case SHOW_POST_SUCCESS: {
      const name = action.detail.User.username;
      if (!state.byName[name]) {
        return state;
      }
      return {
        ...state,
        byName: {
          ...state.byName,
          [name]: {
            ...state.byName[name],
            posts: (state.byName[name].posts || []).concat(action.detail.id),
          },
        },
      };
    }
    default:
      return state;
  }
}

export function getUserByUsername(state, username) {
  return state.byName[username] || {};
}

export function getPostsByUsername(state, username) {
  if (!state.byName[username]) {
    return [];
  }
  return state.byName[username].Rice || [];
}
