import React, { Component, PropTypes } from 'react';

export class Contest extends Component {
  static propTypes = {
    contestID: PropTypes.number.isRequired,
    params: PropTypes.object.isRequired
  };

  render() {
    const { contestID } = this.props.params;
    // const styles = require('./Contest.scss');

    return (
      <div>
        contest {contestID}
      </div>
    );
  }
}
