import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';


function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.data.children.map(child => child.data)
  };
}

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return fetch(`http://www.reddit.com/r/unixporn.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)));
  };
}
