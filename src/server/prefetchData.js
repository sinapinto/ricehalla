/**
 * Fetch data needed by components in the current route
 *
 * @param {Array} components the components in the matched route
 * @returns {Array} promises returned from the fetchData calls
 */
export default function prefetchData(components) {
  const promises = components.filter((prev, current) => {
    if (current.WrappedComponent && current.WrappedComponent.fetchData) {
      return prev.concat(current.WrappedComponent.fetchData({ store }));
    }
    return prev;
  }, []);
  return Promise.all(promises);
}
