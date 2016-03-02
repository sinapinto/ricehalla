import { assert } from 'chai';
import cookie from '../../src/utils/cookie.js';

describe('cookie util', () => {
  it('should set cookies', () => {
    assert.typeOf(document.cookie, 'string');
    assert.isUndefined(cookie.get('blah'), 'no cookie defined');
  });

  it('should get cookies', () => {
    cookie.set('foo', 'bar');
    assert.isUndefined(cookie.get('bar'));
    assert(cookie.get('foo') === 'bar');
  });

  it('should remove cookies', () => {
    cookie.set('hey', 'ho');
    assert(cookie.get('hey') === 'ho');
    cookie.remove('hey');
    assert.isUndefined(cookie.get('hey'));
  });
});
