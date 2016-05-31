import { combineReducers } from 'redux';
import auth from './auth';
import upload from './upload';
import user, * as fromUser from './user';
import post, * as fromPost from './post';
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

export default combineReducers({
  notice,
  auth,
  upload,
  user,
  post,
});

// user selectors
// --------------

export function getUserByUsername(state, username) {
  return fromUser.getUserByUsername(state.user, username);
}

export function getLikedPostsByUsername(state, username) {
  return fromUser.getLikedPostsByUsername(state.user, username);
}

// post selectors
// --------------

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
