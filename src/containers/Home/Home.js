import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadBattle, resetErrorMessage } from '../../actions';
import FetchButton from '../../components/FetchButton';
import List from '../../components/List';
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
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Welcome to rice wars</h1>
        <p className={styles.paragraph}> Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.</p>
        {this.renderErrorMessage()}
        <FetchButton loadBattle={this.props.loadBattle} />
        <List isFetching={isFetching}
          ids={ids}
          loadingLabel="fetching.."
        />
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
