import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from '../../components/Icon';
import style from './Thumbnail.css';

class Thumbnail extends Component {
  constructor() {
    super();
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleUsernameClick = this.handleUsernameClick.bind(this);
  }

  handleLikeClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { isFetchingLike, isloggedIn, likers, currentUser, likePost, unlikePost, id } = this.props;
    if (!isloggedIn) {
      this.context.router.push('/login');
    }
    if (isFetchingLike) {
      return;
    }
    if (likers.includes(currentUser)) {
      unlikePost(id);
    } else {
      likePost(id);
    }
  }

  handleUsernameClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.context.router.push(`/user/${this.props.username}`);
  }

  render() {
    return (
      <Link
        to={`/rice/${this.props.id}`}
        className={style.container}
      >
        <img
          src={`https://s3-us-west-2.amazonaws.com/ricehallaresized/thumb-${this.props.image}`}
          width={315}
          alt={this.props.image}
        />
        <div className={style.infoWrapper}>
            <div className={style.infoWrapper2}>
              <span className={style.flexCenter} onClick={this.handleUsernameClick}>
                <img
                  src={`https://www.gravatar.com/avatar/${this.props.emailHash}?s=20&d=identicon`}
                  className={style.avatar}
                  width={20}
                  height={20}
                  alt="avatar"
                />
                <span className={style.username}>{this.props.username}</span>
              </span>
              <span className={style.flexCenter} onClick={this.handleLikeClick}>
                <span>{this.props.likers.length}</span>
                <Icon
                  name={this.props.likers.includes(this.props.currentUser) ? "heart" : "heart-outline"}
                  size={28}
                  className={style.likeIcon}
                  stroke="white"
                  strokeWidth="10px"
                />
              </span>
            </div>
        </div>
      </Link>
    );
  }
}

Thumbnail.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  likers: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  currentUser: PropTypes.string,
  emailHash: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  isFetchingLike: PropTypes.bool.isRequired,
};

Thumbnail.contextTypes = {
  router: PropTypes.object
};

export default Thumbnail;
