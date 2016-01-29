import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadCounter } from '../actions';

class App extends Component {
  static fetchData({ store }) {
    return store.dispatch(loadCounter());
  }

  handleClick(e) {
    e.preventDefault();
    this.props.dispatch(loadCounter());
  }

  render() {
    return (
      <div>
        <button onClick={::this.handleClick}>click</button>
        {' '}
        Counter: {this.props.count.magic}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.counter,
  };
}

export default connect(mapStateToProps)(App);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  count: PropTypes.object.isRequired,
};
