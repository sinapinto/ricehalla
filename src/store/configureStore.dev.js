import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  DevTools.instrument() // must come after all async store enhancers
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
}
