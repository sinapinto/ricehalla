import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

const propTypes = {
  component: PropTypes.element,
  state: PropTypes.object,
  stats: PropTypes.object
};

class Page extends Component {
  render() {
    const { component, state = '', stats } = this.props;
    const markup = component ? renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {stats &&
            <link href={stats.main.css} rel="stylesheet" type="text/css" charSet="UTF-8" />}
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: markup }} />
          <script dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`
          }}
          />
          {stats && <script src={stats.main.js} charSet="UTF-8" />}
        </body>
      </html>
    );
  }
}

Page.propTypes = propTypes;

export default Page;
