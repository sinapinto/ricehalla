import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';

export default class Page extends Component {
  static propTypes = {
    component: PropTypes.element,
    state: PropTypes.object,
    script: PropTypes.string,
  };

  render() {
    const {
      component,
      state = {},
      script = '',
    } = this.props;

    const markup = component ? renderToString(component) : '';

    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>ricewars™</title>
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
