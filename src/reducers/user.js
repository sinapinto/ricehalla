import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../actions/user';
import {
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  DELETE_POST_SUCCESS,
} from '../actions/post';
// import { toggleLike } from './post';

const initialState = {
  byName: {},
  shouldRefetch: false,
  isFetching: false,
  error: null,
};

export function getUserByUsername(state, username) {
  return state.byName[username] || {};
}

export function getLikedPostsByUsername(state, username) {
  const user = state.byName[username];
  if (!user) {
    return [];
  }
  return user.LikedRice || [];
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_POST_SUCCESS:
      // TODO
      return {
        ...state,
        byName: {},
      };
    case LOAD_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        shouldRefetch: false,
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
    case LIKE_POST_REQUEST:
    case UNLIKE_POST_REQUEST:
      return { ...state, shouldRefetch: true };
    case LIKE_POST_SUCCESS:
    case UNLIKE_POST_SUCCESS:
    case LIKE_POST_FAILURE:
    case UNLIKE_POST_FAILURE:
      return { ...state, shouldRefetch: false };
    // TODO
    // case LIKE_POST_REQUEST:
    // case UNLIKE_POST_REQUEST: {
    //   const post = state[action.username]
    //   return {
    //     ...state,
    //     byName: {
    //       ...state.byName,
    //       [action.username]: {
    //         ...action.username,
    //         LikedRice: toggleLike(state.byName[action.postId], action.username),
    //       },
    //     },
    //   };
    // }
    // case LIKE_POST_FAILURE:
    // case UNLIKE_POST_FAILURE:
    default:
      return state;
  }
}
