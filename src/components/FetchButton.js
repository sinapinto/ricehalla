import React, { Component, PropTypes } from 'react';

export default class FetchButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.getBattle(3);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Fetch Data</button>
      </div>
    );
  }
}

FetchButton.propTypes = {
  getBattle: PropTypes.func.isRequired,
};
