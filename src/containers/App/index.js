import React, { Component } from 'react';
import { Sidebar } from 'components';

export class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        {this.props.children}
      </div>
    );
  }
}
