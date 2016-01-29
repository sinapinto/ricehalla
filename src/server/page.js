import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';

function getStateMarkup(state) {
  return {
    __html:  `window.__INITIAL_STATE__ = ${JSON.stringify(state)}`
  };
}

export default class Page extends Component {
  static propTypes = {
    script: PropTypes.string,
  };

  render() {
    const {
      component = '',
      state = '',
      script = '',
    } = this.props;

    const markup = renderToString(component);

    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <title>ricewars™</title>
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}}/>
          <script dangerouslySetInnerHTML={getStateMarkup(state)} />
          <script src={script} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}
