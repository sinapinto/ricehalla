import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import moment from 'moment';
import marked from 'marked';
import NotFound from '../../components/NotFound';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import Tag from '../../components/Tag';
import Icon from '../../components/Icon';
import { showPost, deletePost, likePost, unlikePost } from '../../actions/post';
import { getPostById } from '../../reducers'
import style from './style.css';

class PostDetail extends Component {
  static prefetchData({ dispatch, params: { id } }) {
    dispatch(showPost(id));
  }

  constructor() {
    super();
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.detail || !this.props.detail.files) {
      this.props.showPost(this.props.params.id);
    }
  }

  isLikedByCurrentUser() {
    return this.props.detail.Liker.some(liker => liker.username === this.props.username);
  }

  handleLikeClick() {
    if (this.props.isFetchingLike) {
      return;
    }
    if (this.isLikedByCurrentUser()) {
      this.props.unlikePost(this.props.detail.id);
    } else {
      this.props.likePost(this.props.detail.id);
    }
  }

  handleDeleteClick() {
    if (!this.props.isFetching) {
      this.props.deletePost(this.props.detail.id);
    }
  }

  createMarkdown() {
    const { description } = this.props.detail;
    return { __html: description ?  marked(description, { sanitize: true }) : '' };
  }

  renderLike() {
    let iconName;
    let { Liker } = this.props.detail;
    if (this.isLikedByCurrentUser()) {
      iconName = 'heart';
    } else {
      iconName = 'heart-outline';
    }
    const icon = <Icon name={iconName} size={28} className={style.heart} />;
    if (this.props.userId) {
      return <span onClick={this.handleLikeClick} className={style.likes}>
        {icon} {typeof Liker !== 'undefined' ? Liker.length : null}
      </span>;
    }
    return <Link to="/register" className={style.likes}>
      {icon} {typeof Liker !== 'undefined' ? Liker.length : null}
    </Link>;
  }

  render() {
    const { User, Tags, files, title = '', scrot, id } = this.props.detail;
    const createdAt = moment(this.props.detail.createdAt).from();
    if (!this.props.isFetching && !scrot) {
      return (
        <NotFound title='Rice not found | Ricehalla'>
          <NotFound.H1>Rice not found</NotFound.H1>
          <NotFound.H2>This rice doesn&rsquo;t seem to exist.</NotFound.H2>
        </NotFound>
      );
    }
    return (
      <div className={style.root}>
        <Helmet title={`${title} | Ricehalla`} />
        <div className={style.imageWrapper}>
          {title && <h3 className={style.title}>{title}</h3>}
          {scrot ?
              <a target="_blank" href={`https://s3-us-west-2.amazonaws.com/ricehalla/${scrot}`}>
                <img
                  className={style.image}
                  src={`https://s3-us-west-2.amazonaws.com/ricehalla/${scrot}`}
                  alt={scrot}
                />
              </a>
            : <Spinner />}
        </div>
        {User ?
          <div className={style.postWrap}>
            <div style={{display: 'inline-block'}}>
              <Link to={`/user/${User.username}`} className={style.authorWrapper}>
                <img
                  src={`https://www.gravatar.com/avatar/${User.emailHash}?s=30&d=identicon`}
                  className={style.avatar}
                  width={30} height={30}
                  alt="avatar"
                />
                <span className={style.postInfoWrapper}>
                  <span className={style.author}>{User.username}</span>
                  <div className={style.age}>{createdAt}</div>
                </span>
              </Link>
            </div>
            {this.renderLike()}
            <div dangerouslySetInnerHTML={this.createMarkdown()} style={{overflow: 'wrap'}}/>
            <div className={style.fileListWrapper}>
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
            </div>
            {Tags && Tags.map((tag, i) =>
              <Tag to={`/?q=${tag.name}`} key={i}>{tag.name}</Tag>)}
            {User && this.props.username === User.username &&
              <div style={{ marginTop: '30px' }}>
                <Button danger outline large onClick={this.handleDeleteClick}>
                  Delete
                </Button>
              </div>}
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
    RiceLikedByUser: PropTypes.object,
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    files: PropTypes.arrayOf(PropTypes.string),
    scrot: PropTypes.string,
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
  deletePost,
  likePost,
  unlikePost,
})(PostDetail);
