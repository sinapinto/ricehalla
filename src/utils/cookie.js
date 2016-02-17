export default {
  set({ key, value = '', path = '/', domain = '', expires = '' }) {
    if (typeof window === 'undefined' || !window.document) {
      return false;
    }

    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
      return false;
    }

    let end = expires;
    if (expires instanceof Date) {
      end = end.toUTCString();
    }

    document.cookie = `${encodeURIComponent(key)}=${value}` +
      `; path=${path}` +
      `; domain=${domain}` +
      `; expires=${end}`;
    return true;
  },

  remove(key) {
    return this.set({ key, expires: 'Thu, 01 Jan 1970 00:00:00 GMT' });
  },
};
