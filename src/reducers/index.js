import { combineReducers } from 'redux';
import auth from './auth';
import upload from './upload';
import user, * as fromUser from './user';
import post, * as fromPost from './post';

export default combineReducers({
  auth,
  upload,
  user,
  post,
});

export function getUserByUsername(state, username) {
  return fromUser.getUserByUsername(state.user, username);
}

export function getPostsByUsername(state, username) {
  return fromUser.getPostsByUsername(state.user, username);
}

export function getPostById(state, id) {
  return fromPost.getPostById(state.post, id);
}

export function getAllPosts(state) {
  return fromPost.getAllPosts(state.post);
}
