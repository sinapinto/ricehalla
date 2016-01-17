import expect from 'expect';
import posts from '../../reducers/posts';
import { REQUEST_POSTS, RECEIVE_POSTS } from '../../actions/posts';

describe('posts reducer', () => {
  it('should handle initial state', () => {
    expect(
      posts(undefined, {})
    ).toEqual({
      isFetching: false,
      items: []
    });
  });

  it('should handle REQUEST_POSTS', () => {
    expect(
      posts([], {
        type: REQUEST_POSTS
      })
    ).toEqual({
      isFetching: true
    });
  });

});
