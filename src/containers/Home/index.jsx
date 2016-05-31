import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import Masonry from '../../components/Masonry';
import Thumbnail from '../../components/Thumbnail';
import TextInput from '../../components/TextInput';
import Icon from '../../components/Icon';
import { fetchList, searchPosts, likePost, unlikePost } from '../../actions/post';
import { getAllPosts, getSearchResults } from '../../reducers';
import style from './style.css';

class Home extends Component {
  static prefetchData({ dispatch }) {
    dispatch(fetchList());
  }

  componentDidMount() {
    this.fetchQuery();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.fetchQuery();
    }
  }

  fetchQuery() {
    if (this.props.location.query.q) {
      this.props.searchPosts(this.props.location.search);
    } else {
      this.props.fetchList(this.props.location.search);
    }
  }

  renderThumbnails() {
    const posts = this.props.location.query.q ? this.props.searchResults : this.props.posts;
    if (!posts) {
      return null;
    }
    return posts.map(post =>
      <Thumbnail
        key={post.id}
        id={post.id}
        image={post.scrot}
        username={post.User.username}
        emailHash={post.User.emailHash}
        likes={post.Liker.length}
        isLikedByCurrentUser={post.Liker.some(liker => liker.username === this.props.username)}
        likePost={this.props.likePost}
        unlikePost={this.props.unlikePost}
        isFetchingLike={this.props.isFetchingLike}
        isloggedIn={!!this.props.userId}
      />);
  }

  render() {
    const { location, searchResults } = this.props;
    return (
      <div className={style.root}>
        <Helmet title="Ricehalla" />
        {location.query.q ?
          <div>
            <h2>results for "{location.query.q}"</h2>
            <p className={style.small}>
              {searchResults.length} result{searchResults.length === 1 ? '' : 's'}
            </p>
          </div>
          : null}
        <Masonry centered>
          {this.renderThumbnails()}
        </Masonry>
      </div>
    );
  }
}

Home.propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.shape({
    query: PropTypes.object,
  }).isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      User: PropTypes.shape({
        username: PropTypes.string.isRequired,
        emailHash: PropTypes.string.isRequired,
      }),
      Tags: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired
      ),
      Liker: PropTypes.arrayOf(PropTypes.object),
      id: PropTypes.number.isRequired,
      scrot: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
    })
  ),
  searchResults: PropTypes.array,
  isFetchingLike: PropTypes.bool.isRequired,
  fetchList: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: getAllPosts(state),
    searchResults: getSearchResults(state),
    isFetchingLike: state.post.isFetchingLike,
  };
}

export default connect(mapStateToProps, {
  fetchList,
  searchPosts,
  likePost,
  unlikePost,
})(Home);
