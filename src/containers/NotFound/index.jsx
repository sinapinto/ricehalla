import React, { Component } from 'react';
import Helmet from 'react-helmet';

class NotFound extends Component {
  render() {
    return (
      <div>
        <Helmet title="Not Found" />
        <h1>404</h1>
        not found :-(
      </div>
    );
  }
}

export default NotFound;
