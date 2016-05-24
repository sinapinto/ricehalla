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

  renderLike() {
    let { currentUser, likers } = this.props;
    let iconName;
    if (likers.includes(currentUser)) {
      iconName = 'heart';
    } else {
      iconName = 'heart-outline';
    }
    const icon = <Icon
            name={iconName}
            size={28}
            className={style.likeIcon}
            stroke="white"
            strokeWidth="10px"
          />;
    if (currentUser) {
      return <span className={style.flexCenter} onClick={this.handleLikeClick}>
        <span>{likers.length}</span> {icon}
      </span>;
    }
    return <span className={style.flexCenter}>
      <Link to="/login" className={style.link}>
        <span>{likers.length}</span> {icon}
      </Link>
    </span>;
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
              {this.renderLike()}
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
