import React, { Component } from 'react';

export class Contest extends Component {
  render() {
    var { contestID } = this.props.params;
    const styles = require('./Contest.scss');

    return (
      <div>
        contest {contestID}
      </div>
    );
  }
}
