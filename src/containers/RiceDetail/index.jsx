import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import moment from 'moment';
import marked from 'marked';
import Icon from '../../components/Icon';
import { showRice, likeRice, unlikeRice } from '../../actions/rice';
import style from './style.css';

const propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string,
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  detail: PropTypes.shape({
    User: PropTypes.shape({
      username: PropTypes.string.isRequired,
      emailHash: PropTypes.string.isRequired,
    }),
    Tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired
    ),
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
    scrot: PropTypes.string,
    likers: PropTypes.array(PropTypes.string),
    createdAt: PropTypes.string,
  }),
  isFetchingLike: PropTypes.bool.isRequired,
  showRice: PropTypes.func.isRequired,
  likeRice: PropTypes.func.isRequired,
  unlikeRice: PropTypes.func.isRequired,
};

class RiceDetail extends Component {
  constructor() {
    super();
    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  handleLikeClick() {
    if (this.props.isFetchingLike) {
      return;
    }
    if (~this.props.detail.likers.indexOf(this.props.username)) {
      this.props.unlikeRice(this.props.detail.id);
    } else {
      this.props.likeRice(this.props.detail.id);
    }
  }

  componentDidMount() {
    this.props.showRice(this.props.params.id);
  }

  createMarkdown() {
    if (this.props.detail.description) {
      return {__html: marked(this.props.detail.description, { sanitize: true })};
    }
    return {__html: ''};
  }

  render() {
    const { User, Tags, files, title = '', scrot, likers, userId, id } = this.props.detail;
    const createdAt = moment(this.props.detail.createdAt).from();
    // const updatedAt = moment(this.props.detail.updatedAt).from();
    let likeIcon;
    if (likers && ~likers.indexOf(this.props.username)) {
      likeIcon = 'heart';
    } else {
      likeIcon = 'heart-outline';
    }
    return (
      <div className={style.root}>
        <Helmet title={`${title} | Ricehalla`} />
        {scrot ? 
          <div className={style.imageWrapper}>
            <a target="_blank" href={`https://s3-us-west-2.amazonaws.com/ricehalla/${scrot}`}>
              <img
                className={style.image}
                src={`https://s3-us-west-2.amazonaws.com/ricehalla/${scrot}`}
                alt={scrot}
              />
            </a>
          </div>
          : null}
        {files ? files.map((file, i) =>
          <div key={i}>
            <div className={style.fileLinkWrapper}>
              <a target="_blank" href={`https://s3-us-west-2.amazonaws.com/ricehalla/${file}`} className={style.fileLink}>
                <Icon name={/(png|jpe?g|gif)$/.test(file) ? 'image' : 'document'} size={32} />
                <span className={style.fileName}>{file}</span>
              </a>
            </div>
          </div>)
        : null}
        {User ?
          <div className={style.rWrapper}>
            <div style={{display: 'inline-block'}}>
              <Link to={`/user/${User.username}`} className={style.authorWrapper}>
                <img
                  src={`http://www.gravatar.com/avatar/${User.emailHash}?s=20&d=identicon`}
                  className={style.avatar}
                  alt="avatar"
                />
                <span className={style.postInfoWrapper}>
                  <span className={style.author}>{User.username}</span>
                  <span> posted </span>
                  <span>{createdAt}</span>
                </span>
              </Link>
            </div>
            <h3 className={style.rTitle}>
              {title}
            </h3>
            <div dangerouslySetInnerHTML={this.createMarkdown()} />
            {Tags ? Tags.map((tag, i) =>
              <Link
                to={`/?tag=${tag.name}`}
                key={i}
                className={style.rTag}
              >
                {tag.name}
              </Link>)
            : null}
            <span
              onClick={this.handleLikeClick}
              className={style.likes}
            >
              <Icon
                name={likeIcon}
                size={32}
                className={style.heart}
              />
              {typeof likers !== 'undefined' ? likers.length : null}
            </span>
          </div>
        : null}
      </div>
    );
  }
}

RiceDetail.propTypes = propTypes;

function mapStateToProps(state) {
  const { posts, showing, isFetchingLike } = state.rice;
  const detail = posts[showing] ? posts[showing] : {};
  return {
    detail,
    isFetchingLike,
  };
}

export default connect(mapStateToProps, {
  showRice,
  likeRice,
  unlikeRice,
})(RiceDetail);
