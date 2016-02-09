import React, { Component, PropTypes } from 'react';
import styles from "./Button.css";

export default class FetchButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.loadBattle();
  }

  render() {
    return <button className={styles.btnDefault} onClick={this.handleClick}>Fetch Data</button>;
  }
}

FetchButton.propTypes = {
  loadBattle: PropTypes.func.isRequired,
};
