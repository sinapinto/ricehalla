import React, { Component, PropTypes } from 'react';

export default class List extends Component {
  /**
   * used by the server to fetch data needed by
   * this component before rendering.
   */
  static fetchData({ store }) {
    return store.dispatch(loadBattle(900));
  }

  renderList() {
    return this.props.ids.map(id => <li key={id}>id: {id}</li>);
  }

  render() {
    const { isFetching, loadingLabel } = this.props;

    if (isFetching) {
      return <h2>{loadingLabel}</h2>;
    }

    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

List.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  ids: PropTypes.array.isRequired,
  loadingLabel: PropTypes.string,
};

List.defaultProps = {
  isFetching: true,
  loadingLabel: 'Loading...',
};