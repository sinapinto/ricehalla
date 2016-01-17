import React, { Component, PropTypes } from 'react';

class Submission extends Component {
  render() {
    const { item } = this.props;
    return (
      <div>
        <h3>item {item.id}</h3>
        { item.thumbnail ? <img src={item.thumbnail} /> : 'no image' }
      </div>
    );
  }
}

Submission.propTypes = {
  item: PropTypes.object.isRequired
};

export default Submission;
