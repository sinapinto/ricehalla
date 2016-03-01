import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import webpackConfig from '../../webpack/client.babel.js';

const propTypes = {
  component: PropTypes.element,
  state: PropTypes.object,
};

class Page extends Component {
  render() {
    const { component, state = '' } = this.props;
    const markup = component ? renderToString(component) : '';
    const head = Helmet.rewind();
    const bundle = webpackConfig.output.publicPath + webpackConfig.output.filename;

    return (
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {/* style-loader is used in dev */}
          { !__DEV__ &&
            <link href="/dist/main.css" rel="stylesheet" type="text/css" charSet="UTF-8" /> }
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />
          <script dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`
          }}
          />
          <script src={bundle} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}

Page.propTypes = propTypes;

export default Page;
