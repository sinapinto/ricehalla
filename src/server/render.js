import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import createRouter from '../containers/Routes';
import Html from './Html';
import configureStore from '../utils/configureStore';

/**
 * Fetch data needed by components in the current route.
 * Depends on components containing a prefetchData static method.
 */
function prefetchData(components, args) {
  const promises = (Array.isArray(components) ? components : [components])
    .filter(comp =>
      comp && comp.prefetchData && typeof comp.prefetchData === 'function'
    )
    .map(comp =>
      comp.prefetchData(args)
    );
  return Promise.all(promises);
}

function render() {
  return function *() {
    const initialState = {
      auth: {
        token: this.cookies.get('token'),
        isAuthenticated: !!this.state.user
      }
    };
    const store = configureStore(initialState);
    const location = createLocation(this.url);
    const routes = createRouter(createMemoryHistory(), store);

    const { error, redirectLocation, renderProps } = yield new Promise((resolve) => {
      match({ routes, location }, (_error, _redirectLocation, _renderProps) => {
        resolve({
          error: _error,
          redirectLocation: _redirectLocation,
          renderProps: _renderProps
        });
      });
    });

    if (error) {
      this.throw(400);
      return;
    } else if (redirectLocation) {
      this.redirect(redirectLocation.pathname + redirectLocation.search);
      return;
    } else if (!renderProps) {
      this.throw(400, 'no render props\n');
      return;
    }

    yield prefetchData(renderProps.components, {
      dispatch: store.dispatch,
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
    });

    const component = (
      <Provider store={store}>
        { <RouterContext {...renderProps} /> }
      </Provider>
    );
    const html = <Html component={component} state={store.getState()} />;
    this.body = `<!DOCTYPE html>\n${renderToString(html)}`;
  };
}

export default render;
