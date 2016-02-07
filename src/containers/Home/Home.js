import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadBattle, resetErrorMessage } from '../../actions';
import FetchButton from '../../components/FetchButton';
import List from '../../components/List';
import { Link } from 'react-router';
import styles from './Home.css';

class Home extends Component {
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
        <h3 onClick={this.handleDismiss}>
          {errorMessage}
        </h3>
      );
    }
    return null;
  }

  render() {
    const { isFetching, ids, ...other } = this.props.battle;
    return (
      <div className={styles.home}>
        <h3>HOme view</h3>
        {this.renderErrorMessage()}
        <FetchButton loadBattle={this.props.loadBattle} />
        <List isFetching={isFetching}
          ids={ids}
          loadingLabel="fetching.."
        />
        <Link className={styles.piss} to="/create">sdlfkj</Link>
      </div>
    );
  }
}

export default connect(
  state => ({
    battle: state.battle,
    errorMessage: state.errorMessage
  }),
  { loadBattle, resetErrorMessage }
)(Home);

Home.propTypes = {
  loadBattle: PropTypes.func.isRequired,
  battle: PropTypes.object.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
