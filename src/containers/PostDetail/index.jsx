import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import moment from 'moment';
import marked from 'marked';
import NotFound from '../../components/NotFound';
import Icon from '../../components/Icon';
import { showPost, likePost, unlikePost } from '../../actions/post';
import { getPostById } from '../../reducers'
import style from './style.css';

class PostDetail extends Component {
  constructor() {
    super();
    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.detail || !this.props.detail.files) {
      this.props.showPost(this.props.params.id);
    }
  }

  handleLikeClick() {
    if (this.props.isFetchingLike) {
      return;
    }
    if (this.props.detail.likers.includes(this.props.username)) {
      this.props.unlikePost(this.props.detail.id);
    } else {
      this.props.likePost(this.props.detail.id);
    }
  }

  createMarkdown() {
    const { description } = this.props.detail;
    return { __html: description ?  marked(description, { sanitize: true }) : '' };
  }

  render() {
    const { User, Tags, files, title = '', scrot, likers, id } = this.props.detail;
    const createdAt = moment(this.props.detail.createdAt).from();
    let likeIcon;
    if (likers && likers.includes(this.props.username)) {
      likeIcon = 'heart';
    } else {
      likeIcon = 'heart-outline';
    }
    if (!this.props.isFetching && !scrot) {
      return (
        <NotFound title='Rice not found | Ricehalla'>
          <NotFound.H1>Rice not found</NotFound.H1>
          <NotFound.H2>This rice doesn&apos;t seem to exist.</NotFound.H2>
        </NotFound>
      );
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
          <div className={style.fileWrapper} key={i}>
            <a
              target="_blank"
              href={`https://s3-us-west-2.amazonaws.com/ricehalla/${file}`}
              className={style.fileLink}
            >
              <div className={style.file}>
                <Icon
                  name={/(png|jpe?g|gif)$/.test(file) ? 'image' : 'document'}
                  size={40}
                  className={style.fileIcon}
                />
                <span>
                  <div className={style.fileName}>{file.replace(/_\d{13}/, '')}</div>
                  <div className={style.fileName2}>{file}</div>
                </span>
              </div>
            </a>
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
                size={28}
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

PostDetail.propTypes = {
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
  isFetching: PropTypes.bool.isRequired,
  isFetchingLike: PropTypes.bool.isRequired,
  showPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { isFetching, isFetchingLike } = state.post;
  const id = ownProps.params.id;
  return {
    detail: getPostById(state, id),
    isFetching,
    isFetchingLike,
  };
}

export default connect(mapStateToProps, {
  showPost,
  likePost,
  unlikePost,
})(PostDetail);
