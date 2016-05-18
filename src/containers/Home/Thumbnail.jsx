import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from '../../components/Icon';
import style from './thumbnail.css';

const propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  likers: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
  emailHash: PropTypes.string.isRequired,
  likeRice: PropTypes.func.isRequired,
  unlikeRice: PropTypes.func.isRequired,
  isFetchingLike: PropTypes.bool.isRequired,
};

const contextTypes = {
  router: PropTypes.object
};

class Thumbnail extends Component {
  constructor() {
    super();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleUsernameClick = this.handleUsernameClick.bind(this);
    this.state = {
      isHovered: false,
    };
  }

  handleMouseEnter() {
    this.setState({ isHovered: true });
  }

  handleMouseLeave() {
    this.setState({ isHovered: false });
  }

  handleLikeClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { isFetchingLike, likers, currentUser, likeRice, unlikeRice, id } = this.props;
    if (isFetchingLike) {
      return;
    }
    if (likers.includes(currentUser)) {
      unlikeRice(id);
    } else {
      likeRice(id);
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
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img
          src={`https://s3-us-west-2.amazonaws.com/ricehallaresized/thumb-${this.props.image}`}
          width={315}
          alt={this.props.image}
        />
        {this.state.isHovered ?
          <div className={style.infoWrapper}>
            <div className={style.infoWrapper2}>
              <span className={style.flexCenter} onClick={this.handleUsernameClick}>
                <img
                  src={`http://www.gravatar.com/avatar/${this.props.emailHash}?s=20&d=identicon`}
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
                />
              </span>
            </div>
          </div>
          : null}
      </Link>
    );
  }
}

Thumbnail.propTypes = propTypes;
Thumbnail.contextTypes = contextTypes;

export default Thumbnail;
