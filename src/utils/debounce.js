/**
 * returns a debounced function that wraps `fn`
 * and a cancel method to abort delayed `fn` invocations.
 *
 * @param {function} fn
 * @param {number} interval
 * @returns {function} debounced function
 */
export default function debounce(fn, interval) {
  let timeoutId;
  let result;

  if (typeof fn !== 'function') {
    throw new TypeError('Expected fn to be a function');
  }

  const wait = parseInt(interval, 10) || 0;

  function debounced(...args) {
    const ctx = this;

    function later() {
      timeoutId = null;
      result = fn.apply(ctx, args);
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, wait);
    return result;
  }

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  debounced.cancel = cancel;
  return debounced;
}
