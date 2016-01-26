import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions/posts';

const initialState = {
  isFetching: false,
  items: []
};

export default function redditPosts(state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      });
    default:
      return state;
  }
}
