import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import moment from 'moment';
import marked from 'marked';
import NotFound from '../../components/NotFound';
import { loadUser } from '../../actions/user';
import { getUserByUsername, getPostsByUsername } from '../../reducers';
import style from './style.css';

class Profile extends Component {
  componentDidMount() {
    const { username, user, params, loadUser, didSubmit } = this.props;
    // FIXME: if user has submitted a post, fetch own data
    // ugly side-effect of having posts redundant in state tree.
    if (Object.keys(user).length === 0 || (params.username === username && didSubmit)) {
      loadUser(params.username);
    }
  }

  createMarkdown(text) {
    return { __html: text ? marked(text, { sanitize: true }) : '' };
  }

  render() {
    const { username } = this.props.params;
    const { email, emailHash, about, createdAt } = this.props.user;

    if (!this.props.isFetching && !email) {
      return (
        <NotFound title='User not found | Ricehalla'>
          <NotFound.H1>User not found</NotFound.H1>
          <NotFound.H2>There doesn&apos;t seem to be a user named <b>{username}</b>.</NotFound.H2>
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
                src={`https://www.gravatar.com/avatar/${emailHash}?s=100&d=identicon`}
                width={100}
                height={100}
                className={style.avatar}
              />
              : null}
            {createdAt ?
              <div>
                <h1 className={style.username}>
                  <Link to={`/user/${username}`}>
                    {username}
                  </Link>
                </h1>
                <span className={style.joined}>
                  Joined on {moment(createdAt).format('dddd, MMMM Do YYYY')}
                </span>
              </div>
              : null}
          </div>
        </div>
        <div className={style.activity}>
        {this.props.posts ? <h3 className={style.h3}>Recent</h3> : null}
          {this.props.posts ? this.props.posts.map(post =>
            <Link key={post.id} to={`/rice/${post.id}`}>
              <div className={style.rWrapper}>
                <h3 className={style.rTitle}>{post.title}</h3>
                <div dangerouslySetInnerHTML={this.createMarkdown(post.description)} />
                {post.Tags ? post.Tags.map((tag, i) =>
                  <span key={i} className={style.rTag}>
                    {tag.name}
                  </span>)
                : null}
                <div className={style.rAge}>{moment(post.createdAt).from()}</div>
              </div>
            </Link>)
          : null}
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
  isFetching: PropTypes.bool.isRequired,
  didSubmit: PropTypes.bool.isRequired,
  params: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  loadUser: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const username = ownProps.params.username;
  return {
    user: getUserByUsername(state, username),
    posts: getPostsByUsername(state, username),
    isFetching: state.user.isFetching,
    didSubmit: state.post.didSubmit,
  };
}

export default connect(mapStateToProps, {
  loadUser,
})(Profile);
