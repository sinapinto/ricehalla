import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

class Page extends Component {
  render() {
    const { component, state = '', assets } = this.props;
    const markup = component ? renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {assets &&
            <link href={assets.main.css} rel="stylesheet" type="text/css" charSet="UTF-8" />}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />
          <script dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`
          }}
          />
          {assets ? <script src={assets.main.js} charSet="UTF-8" />
          : <script src={`http://localhost:${__PORT__}/dist/bundle.js`} charSet="UTF-8" />}
        </body>
      </html>
    );
  }
}

Page.propTypes = {
  component: PropTypes.element,
  state: PropTypes.object,
  assets: PropTypes.object
};

export default Page;
