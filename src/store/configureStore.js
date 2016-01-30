import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
// import createLogger from 'redux-logger';
import api from '../middleware/api';

export default function configureStore(initialState) {
  const middleware = [thunk, api];

  if (process.env.NODE_ENV === 'production') {
    return createStore(
      rootReducer,
      initialState,
      applyMiddleware(...middleware)(createStore)
    );
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      // applyMiddleware(createLogger({ logger: console })),
      DevTools.instrument() // must come after all async store enhancers
    )
  );

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers'));
    });
  }

  return store;
}
