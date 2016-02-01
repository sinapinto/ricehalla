import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadBattle } from '../actions';
import FetchButton from '../components/FetchButton';
import List from '../components/List';

class App extends Component {
  render() {
    const { status, ids, ...other } = this.props.battle;

    return (
      <div>
        <FetchButton getBattle={this.props.loadBattle} />
        <List isFetching={status}
          ids={ids}
          loadingLabel="fetching.."
          {...other}
        />
      </div>
    );
  }
}

export default connect(
  state => ({ battle: state.battle }),
  { loadBattle }
)(App);

App.propTypes = {
  battle: PropTypes.object.isRequired,
  loadBattle: PropTypes.func.isRequired,
};
