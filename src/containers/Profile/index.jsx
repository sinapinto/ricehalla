import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import moment from 'moment';
import marked from 'marked';
import Masonry from '../../components/Masonry';
import NotFound from '../../components/NotFound';
import Thumbnail from '../../components/Thumbnail';
import { loadUser } from '../../actions/user';
import { likePost, unlikePost } from '../../actions/post';
import {
  getUserByUsername,
  getPostsByUsername,
  getLikedPostsByUsername,
} from '../../reducers';
import style from './style.css';

const POST = 1;
const LIKE = 2;

class Profile extends Component {
  static prefetchData({ dispatch, params: { username } }) {
    dispatch(loadUser(username));
  }

  constructor(props) {
    super(props);
    this.state = {
      activeTab: POST,
    };
  }

  componentDidMount() {
    // const { user, params, loadUser } = this.props;
    // if (Object.keys(user).length === 0) {
    //   loadUser(params.username);
    // }
    // TODO: cache
    this.props.loadUser(this.props.params.username);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.shouldRefetch && nextProps.shouldRefetch) {
      this.props.loadUser(this.props.username);
    }
  }

  renderThumbnails() {
    if (this.state.activeTab === POST) {
      return this.props.posts ? this.props.posts.map(post =>
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
        />) : null;
    }
    return this.props.likedPosts ? this.props.likedPosts.map(post =>
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
      />) : null;
  }

  render() {
    const { posts, likedPosts, isFetching } = this.props;
    const { username } = this.props.params;
    const { id, emailHash, about, createdAt } = this.props.user;

    if (!isFetching && !id) {
      return (
        <NotFound title='User not found | Ricehalla'>
          <NotFound.H1>User not found</NotFound.H1>
          <NotFound.H2>
            There doesn&rsquo;t seem to be anybody named <b>{username.substr(0, 20)}</b>.
          </NotFound.H2>
        </NotFound>
      );
    }
    return (
      <div className={style.root}>
        <Helmet title={`${username} | Ricehalla`} />
        <div className={style.bioWrapper}>
          <div className={style.bio}>
            {emailHash ?
              <img
                src={`https://www.gravatar.com/avatar/${emailHash}?s=130&d=identicon`}
                width={130}
                height={130}
                alt="avatar"
                className={style.avatar}
              />
              : null}
              <div>
                <h1 className={style.username}>
                  <Link to={`/user/${username}`}>
                    {username}
                  </Link>
                </h1>
                {createdAt ?
                  <p className={style.joined}>
                    Joined on {moment(createdAt).format('dddd, MMMM Do YYYY')}
                  </p>
                  : null}
              </div>
          </div>
        </div>
        <div className={style.activity}>
          <div className={style.tabWrapper}>
            <span
              className={this.state.activeTab === POST ? style.tabActive : style.tab}
              onClick={() => this.setState({ activeTab: POST })}
            >
              {posts.length} post{posts.length === 1 ? '' : 's'}
            </span>
            <span
              className={this.state.activeTab === LIKE ? style.tabActive : style.tab}
              onClick={() => this.setState({ activeTab: LIKE })}
            >
              {likedPosts.length} like{likedPosts.length === 1 ? '' : 's'}
            </span>
          </div>
          <Masonry>
            {this.renderThumbnails()}
          </Masonry>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string,
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  likedPosts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isFetchingLike: PropTypes.bool.isRequired,
  shouldRefetch: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  loadUser: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const username = ownProps.params.username;
  return {
    user: getUserByUsername(state, username),
    posts: getPostsByUsername(state, username),
    likedPosts: getLikedPostsByUsername(state, username),
    isFetching: state.user.isFetching,
    isFetchingLike: state.post.isFetchingLike,
    shouldRefetch: state.user.shouldRefetch,
  };
}

export default connect(mapStateToProps, {
  loadUser,
  likePost,
  unlikePost,
})(Profile);
