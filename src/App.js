import React, { Component } from 'react';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>
        index
      </h1>
    );
  }
}

export class App extends Component {
  render() {
    return (
      <div>
        <Index />
      </div>
    );
  }
}
