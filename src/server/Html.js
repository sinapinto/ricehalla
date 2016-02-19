import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import webpackConfig from '../../webpack/client.babel.js';

export default class Page extends Component {
  static propTypes = {
    component: PropTypes.element,
    state: PropTypes.object,
  };

  render() {
    const { component, state = '' } = this.props;
    const head = Helmet.rewind();
    const markup = component ? renderToString(component) : '';
    const script = webpackConfig.output.publicPath + webpackConfig.output.filename;

    return (
      <html>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          {/* style-loader is used in dev */}
          { !__DEV__ &&
            <link href="/dist/main.css" rel="stylesheet" type="text/css" charSet="UTF-8"/> }
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: markup }}/>
          <script dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`
          }}
          />
          <script src={script} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}
