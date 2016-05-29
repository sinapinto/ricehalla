import { combineReducers } from 'redux';
import auth from './auth';
import upload from './upload';
import user, * as fromUser from './user';
import post, * as fromPost from './post';
import { SHOW_POST_SUCCESS, LIST_POST_SUCCESS } from '../actions/post';
import { LOAD_USER_SUCCESS } from '../actions/user';
import { SET_NOTICE, CLEAR_NOTICE } from '../actions/notice';

function notice(state = { message: '', level: '' }, action) {
  switch (action.type) {
    case SET_NOTICE:
      return {
        level: action.level,
        message: action.message,
      };
    case CLEAR_NOTICE:
      return {
        message: '',
        level: '',
      };
    default:
      return state;
  }
}

// maintain a map of username to id to simplify lookups by username
function usersMap(state = {}, action) {
  switch (action.type) {
    case SHOW_POST_SUCCESS: {
      let u = action.detail.User;
      return Object.assign({}, state, { [u.username]: u.id });
    }
    case LIST_POST_SUCCESS: {
      return Object.assign({}, state,
        ...action.list.map(p => ({ [p.User.username]: p.User.id })),
      );
    }
    case LOAD_USER_SUCCESS: {
      let u = action.user;
      return Object.assign({}, state, { [u.username]: u.id });
    }
    default:
      return state;
  }
}

export default combineReducers({
  notice,
  usersMap,
  auth,
  upload,
  user,
  post,
});

// exports for selectors
// ---------------------

export function getUserByUsername(state, username) {
  const id = state.usersMap[username];
  return fromUser.getUserByUsername(state.user, id);
}

export function getPostsByUsername(state, username) {
  return fromPost.getPostsByUsername(state.post, username);
}

export function getPostById(state, id) {
  return fromPost.getPostById(state.post, id);
}

export function getAllPosts(state) {
  return fromPost.getAllPosts(state.post);
}

export function getSearchResults(state) {
  return fromPost.getSearchResults(state.post);
}
