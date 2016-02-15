/**
 * Fetch data needed by components in the current route.
 * This function is uesd for preloading data on the server
 * before rendering and sending markup to the client.
 *
 * Depends on components containing a loadAsyncData method.
 *
 * @param {Array} components matched router components
 * @param {Object} store redux store
 * @returns {Array} promises returned from fetchData calls
 */
export default function prefetchData(components, store) {
  const promises = components.filter((prev, current) => {
    if (current.WrappedComponent && current.WrappedComponent.fetchData) {
      return prev.concat(current.WrappedComponent.loadAsyncData(store));
    }
    return prev;
  }, []);

  return Promise.all(promises);
}
