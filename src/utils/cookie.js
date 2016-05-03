export default {

  set(key, value = '', options = {}) {
    this.checkWindow();
    this.checkKey(key);

    const defaultOptions = {
      path: '/',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      domain: null,
      secure: false,
    };

    const opt = {
      ...options,
      ...defaultOptions,
    };

    if (opt.expires instanceof Date) {
      opt.expires = opt.expires.toUTCString();
    }

    let cookie = `${key}=${encodeURIComponent(value)}; path=${opt.path}; expires=${opt.expires}`;

    if (opt.domain) {
      cookie += `; domain=${opt.domain}`;
    }

    if (opt.secure) {
      cookie += '; secure';
    }

    document.cookie = cookie;
  },

  get(key) {
    this.checkWindow();
    this.checkKey(key);

    const re = new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`);

    const val = document.cookie.replace(re, '$1');

    return val ? decodeURIComponent(val) : undefined;
  },

  remove(key) {
    this.set(key, '', { expires: new Date(0) });
  },

  removeAll() {
    document
      .cookie
      .replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:=[^;]*)?;\s*/)
      .forEach(key => this.remove(key));
  },

  checkWindow() {
    if (typeof window.document !== 'object') {
      throw new ReferenceError('no window.document object');
    }
  },

  checkKey(key) {
    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
      throw new TypeError('argument key is invalid');
    }
  },
};
