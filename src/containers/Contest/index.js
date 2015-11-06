import React, { Component } from 'react';

export class Contest extends Component {
  render() {
    var { contestID } = this.props.params;

    return (
      <div>
        contest {contestID}
      </div>
    );
  }
}
