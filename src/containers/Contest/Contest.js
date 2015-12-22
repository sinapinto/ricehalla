import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Contest extends Component {
  static propTypes = {
    contestID: PropTypes.number.isRequired,
    params: PropTypes.object.isRequired,
    vote: PropTypes.object.isRequired
  };

  render() {
    const { contestID } = this.props.params;
    const {vote} = this.props;
    // const styles = require('./Contest.scss');

    return (
      <div>
        contest {contestID}
        <button className="btn" onClick={vote}>vote</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { votes: state.votes };
}

export default connect(mapStateToProps)(Contest);
