import expect from 'expect';
import { REQUEST_POSTS, RECEIVE_POSTS, requestPosts } from '../../actions/posts';

describe('todo actions', () => {
  it('requestPosts should create REQUEST_POSTS action', () => {
    expect(requestPosts()).toEqual({
      type: REQUEST_POSTS,
    });
  });

});
