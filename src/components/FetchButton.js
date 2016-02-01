import React, { Component, PropTypes } from 'react';

export default class FetchButton extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.getBattle(3);
  }

  render() {
    return (
      <div>
        <button onClick={::this.handleClick}>Fetch Data</button>
      </div>
    );
  }
}

FetchButton.propTypes = {
};
