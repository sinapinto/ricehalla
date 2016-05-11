import React, { Component } from 'react';
import Helmet from 'react-helmet';

class NotFound extends Component {
  render() {
    return (
      <div>
        <Helmet title="Not Found" />
        <div style={{ textAlign: 'center' }}>
          <h1>404</h1>
          <p>not found :-(</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
