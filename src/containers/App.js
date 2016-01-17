import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import Submission from '../components/Submission';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleClick(e) {
    e.preventDefault();
    this.props.dispatch(fetchPosts());
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>refresh</button>
        {this.props.isFetching ? 'Loading' : null}
        {this.props.posts.items.map(item => <Submission key={item.id} item={item} /> )}
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.shape({
    items: PropTypes.array.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.redditPosts
  };
}

export default connect(mapStateToProps)(App);
