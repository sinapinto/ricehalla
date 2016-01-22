import React, { Component, PropTypes } from 'react';

class Battle extends Component {
  render() {
    return (
      <div>
        {this.props.params.id}
      </div>
    );
  }
}

Battle.propTypes = {
};

export default Battle;
