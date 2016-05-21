import React, { Component } from 'react';
import NotFoundComponent from '../../components/NotFound';

class NotFound extends Component {
  render() {
    return (
      <NotFoundComponent title="Not Found">
        <NotFoundComponent.H1>404</NotFoundComponent.H1>
        <NotFoundComponent.H2>Not Found</NotFoundComponent.H2>
      </NotFoundComponent>
    );
  }
}

export default NotFound;
