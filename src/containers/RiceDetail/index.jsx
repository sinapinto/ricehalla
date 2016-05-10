import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import moment from 'moment';
import Icon from '../../components/Icon';
import { show as showRice } from '../../actions/rice';
import style from './style.css';

const propTypes = {
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
    likes: PropTypes.number,
    files: PropTypes.string,
    scrot: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  showRice: PropTypes.func.isRequired,
};

class RiceDetail extends Component {
  constructor() {
    super();
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.state = {
      liked: false,
    };
  }

  handleLikeClick() {
    this.setState({ liked: !this.state.liked });
  }

  componentDidMount() {
    if (this.props.params.id) {
      this.props.showRice(this.props.params.id);
    }
  }

  render() {
    const { User, Tags, title = '', description, likes, scrot, userId, id } = this.props.detail;
    const files = typeof this.props.detail.files !== 'undefined'
      ? JSON.parse(this.props.detail.files)
      : [];
    const createdAt = moment(this.props.detail.createdAt).from();
    const updatedAt = moment(this.props.detail.updatedAt).from();
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
                <Icon name="link" size={20} />
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
            <p className={style.rDescription}>
              {description}
            </p>
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
                name={this.state.liked ? "heart" : "heart-outline"}
                size={20}
                className={style.heart}
              />
              {typeof likes !== 'undefined' ?
                (this.state.liked ? likes + 1 : likes)
                  : null}
            </span>
          </div>
        : null}
      </div>
    );
  }
}

RiceDetail.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    detail: state.rice.detail,
  };
}

export default connect(mapStateToProps, { showRice })(RiceDetail);
