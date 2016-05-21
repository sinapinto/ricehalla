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

const initialState = {
  byId: {},
  byUsername: {
    // name: [3, 42]
  },
  didSubmit: false,
  hasFetchedList: false,
  isFetching: false,
  isFetchingLike: false,
  error: null,
};

function toggleLike(post, username) {
  if (typeof post === 'undefined') {
    return {};
  }
  if (post.likers.includes(username)) {
    // remove username
    return {
      ...post,
      likers: post.likers.filter(name => name !== username),
    };
  }
  // add username
  return {
    ...post,
    likers: post.likers.concat(username),
  };
}

// return a copy of the post with `Liker` object mapped to a `likers` array
function mapLikers(post) {
  if (!post.Liker) {
    return post;
  }
  let likers = post.Liker.map(user => user.username);
  let ret = Object.assign({}, post, { likers });
  delete ret.Liker;
  return ret;
}

function concatIfMissing(array = [], elem) {
  if (array.includes(elem)) {
    return array;
  }
  return array.concat(elem);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SUBMIT_POST_SUCCESS: {
      // const files = typeof action.submitted.files !== 'undefined'
      //   ? JSON.parse(action.submitted.files)
      //   : [];
      // const post = Object.assign({}, action.submitted, { files });
      // const postId = action.submitted.id;
      return {
        ...state,
        isFetching: false,
        didSubmit: true,
        // byId: Object.assign({}, state.byId, {
        //   [postId]: post
        // }),
      };
    }
    case SHOW_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case SHOW_POST_SUCCESS: {
      const files = typeof action.detail.files !== 'undefined'
        ? JSON.parse(action.detail.files)
        : [];
      let post = Object.assign({}, mapLikers(action.detail), { files });
      let username = action.detail.User.username;
      return {
        ...state,
        byId: Object.assign({}, state.byId, {
          [post.id]: post,
        }),
        byUsername: Object.assign({}, state.byUsername,
          { [username]: concatIfMissing(state.byUsername[username], action.detail.id) }
        ),
        isFetching: false,
      };
    }
    case LIST_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LIST_POST_SUCCESS: {
      let posts = action.list.map(post => mapLikers(post));

      let byUsername = posts.reduce((byU, post) => {
        const name = post.User.username;
        if (byU[name] && byU[name].includes(post.id)) {
          return byU;
        }
        return {
          ...byU,
          [name]: concatIfMissing(byU[name], post.id),
        };
      }, Object.assign({}, state.byUsername));

      return {
        ...state,
        isFetching: false,
        hasFetchedList: true,
        byId: Object.assign({}, state.byId,
           ...posts.map(post => ({ [post.id]: post }))
        ),
        byUsername,
      };
    }
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

// export function getPostsByAuthor(state, username) {
//   const ids = state.byUsername[username];
//   if (!ids) {
//     return [];
//   }
//   return ids.map(id => getPostById(id));
// }

export function getPostById(state, id) {
  return state.byId[id] || {};
}

export function getAllPosts(state) {
  return Object.keys(state.byId).map(key => state.byId[key]);
}
