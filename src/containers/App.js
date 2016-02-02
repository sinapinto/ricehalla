import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadBattle, resetErrorMessage } from '../actions';
import FetchButton from '../components/FetchButton';
import List from '../components/List';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleDismiss(e) {
    e.preventDefault();
    this.props.resetErrorMessage();
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return (
        <h3
          onClick={this.handleDismiss}
          style={{ color: 'red' }}
        >
          {errorMessage}
        </h3>
      );
    }
    return null;
  }

  render() {
    const { status, ids, ...other } = this.props.battle;

    return (
      <div>
        {this.renderErrorMessage()}
        <FetchButton loadBattle={this.props.loadBattle} />
        <List
          isFetching={status}
          ids={ids}
          loadingLabel="fetching.."
          {...other}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage,
    battle: state.battle,
  };
}

export default connect(mapStateToProps, {
  loadBattle,
  resetErrorMessage,
})(App);

App.propTypes = {
  // actions
  loadBattle: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  // state
  battle: PropTypes.object.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
