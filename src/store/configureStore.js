import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import createLogger from 'redux-logger';
import api from '../middleware/api';

export default function configureStore(initialState) {
  const middleware = [thunk, api];
  let finalCreateStore;

  if (process.env.NODE_ENV === 'production') {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
    return finalCreateStore(rootReducer, initialState);
  }

  finalCreateStore = compose(
    applyMiddleware(...middleware),
    // applyMiddleware(createLogger({ logger: console })),
    DevTools.instrument() // must come after all async store enhancers
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
}
