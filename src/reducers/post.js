import {
  SUBMIT_POST_REQUEST,
  SUBMIT_POST_SUCCESS,
  SUBMIT_POST_FAILURE,
  SHOW_POST_REQUEST,
  SHOW_POST_SUCCESS,
  SHOW_POST_FAILURE,
  LIST_POST_REQUEST,
  LIST_POST_SUCCESS,
  LIST_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
} from '../actions/post';
import { LOAD_USER_SUCCESS } from '../actions/user';

const initialState = {
  byId: {},
  didFetchList: false,
  isFetching: false,
  isFetchingLike: false,
  error: null,
};

// selectors
// ---------

export function getPostsByUsername(state, username) {
  const posts = Object.keys(state.byId).map(id => state.byId[id])
    .filter(post => post.User && post.User.username === username);
  // flatten nested arrays
  return Array.prototype.concat.apply([], posts);
}

export function getPostById(state, postId) {
  return state.byId[postId] || {};
}

export function getAllPosts(state) {
  return Object.keys(state.byId).map(key => state.byId[key]);
}

// helpers
// -------

function toggleLike(post, username) {
  if (typeof post === 'undefined') {
    return {};
  }
  if (post.Liker.some(liker => liker.username === username)) {
    return { ...post, Liker: post.Liker.filter(liker => liker.username !== username) };
  }
  const liker = {
    username,
    RiceLikedByUser: {
      createdAt: (new Date).toISOString(),
    },
  };
  return { ...post, Liker: post.Liker.concat(liker) };
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_SUCCESS: {
      if (!action.user.Rice) {
        return state;
      }
      const user = {
        User: {
          id: action.user.id,
          username: action.user.username,
          emailHash: action.user.emailHash,
        },
      };
      const byId = action.user.Rice.reduce((obj, rice) =>
        ({
          ...obj,
          [rice.id]: Object.assign({}, obj[rice.id], rice, user),
        })
      , { ...state.byId });
      return {
        ...state,
        byId,
      };
    }
    case SUBMIT_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SUBMIT_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case SHOW_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SHOW_POST_SUCCESS: {
      const files = typeof action.detail.files !== 'undefined'
        ? JSON.parse(action.detail.files)
        : [];
      let post = Object.assign({}, action.detail, { files });
      return {
        ...state,
        byId: Object.assign({}, state.byId, {
          [post.id]: post,
        }),
        isFetching: false,
      };
    }
    case LIST_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LIST_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didFetchList: true,
        byId: Object.assign({}, state.byId,
           ...action.list.map(post => ({ [post.id]: post }))
        ),
      };
    case LIKE_POST_REQUEST:
    case UNLIKE_POST_REQUEST:
      return {
        ...state,
        isFetchingLike: true,
        byId: {
          ...state.byId,
          [action.postId]: toggleLike(state.byId[action.postId], action.username),
        },
      };
    case LIKE_POST_SUCCESS:
    case UNLIKE_POST_SUCCESS:
      return {
        ...state,
        isFetchingLike: false,
      };
    case LIKE_POST_FAILURE:
    case UNLIKE_POST_FAILURE:
      return {
        ...state,
        isFetchingLike: false,
        byId: {
          ...state.byId,
          [action.postId]: toggleLike(state.byId[action.postId], action.username),
        },
      };
    case SUBMIT_POST_FAILURE:
    case SHOW_POST_FAILURE:
    case LIST_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
