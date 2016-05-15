import {
  POST_RICE_REQUEST,
  POST_RICE_SUCCESS,
  POST_RICE_FAILURE,
  SHOW_RICE_REQUEST,
  SHOW_RICE_SUCCESS,
  SHOW_RICE_FAILURE,
  LIST_RICE_REQUEST,
  LIST_RICE_SUCCESS,
  LIST_RICE_FAILURE,
  LIKE_RICE_REQUEST,
  LIKE_RICE_SUCCESS,
  LIKE_RICE_FAILURE,
  UNLIKE_RICE_REQUEST,
  UNLIKE_RICE_SUCCESS,
  UNLIKE_RICE_FAILURE,
} from '../actions/rice';

const initialState = {
  showing: null,
  posts: {}, // by id
  hasFetchedList: false, // flag to avoid refetching list
  isFetching: false,
  isFetchingLike: false,
  error: null,
};

function toggleLike(post, username) {
  if (typeof post === 'undefined') {
    return {};
  }
  if (~post.likers.indexOf(username)) {
    // remove username
    return {
      ...post,
      likers: post.likers.filter(name => name !== username),
    };
  } else {
    // add username
    return {
      ...post,
      likers: post.likers.concat(username),
    };
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_RICE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case POST_RICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: Object.assign({}, state.posts,
          { [action.submitted.id]: action.submitted }
        ),
      };
    case SHOW_RICE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SHOW_RICE_SUCCESS: {
      const files = typeof action.detail.files !== 'undefined' ? JSON.parse(action.detail.files) : [];
      let { detail } = action;
      if (action.detail.Liker) {
        let likers = action.detail.Liker.map(user => user.username);
        detail = Object.assign({}, action.detail, { files }, { likers });
        delete detail.Liker;
      }
      return {
        ...state,
        showing: detail.id,
        posts: Object.assign({}, state.posts, {
          [detail.id]: detail,
        }),
        isFetching: false,
      };
    }
    case LIST_RICE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LIST_RICE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasFetchedList: true,
        posts: Object.assign({}, state.posts,
           ...action.list.map(post => ({ [post.id]: post }))
        ),
      };
    case LIKE_RICE_REQUEST:
    case UNLIKE_RICE_REQUEST:
      return {
        ...state,
        isFetchingLike: true,
        posts: {
          ...state.posts,
          [action.riceId]: toggleLike(state.posts[action.riceId], action.username),
        },
      };
    case LIKE_RICE_SUCCESS:
    case UNLIKE_RICE_SUCCESS:
      return {
        ...state,
        isFetchingLike: false,
      };
    case LIKE_RICE_FAILURE:
    case UNLIKE_RICE_FAILURE:
      return {
        ...state,
        isFetchingLike: false,
        posts: {
          ...state.posts,
          [action.riceId]: toggleLike(state.posts[action.riceId], action.username),
        },
      };
    case POST_RICE_FAILURE:
    case SHOW_RICE_FAILURE:
    case LIST_RICE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
