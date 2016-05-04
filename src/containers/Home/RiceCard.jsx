import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TagList from './TagList';
import style from './style.css';

const propTypes = {
  riceId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  files: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
};

const defaultProps = {
  description: '',
  likes: 0,
};

class RiceCard extends Component {
  renderThumbnail() {
    const files = typeof this.props.files !== 'undefined'
      ? JSON.parse(this.props.files)
      : [];
    let img = files.find(f => /\.(png|gif|jpe?g)(?:-large)?$/.test(f));
    return (
      <img
        className={style.thumbnailImage}
        src={`/uploads/${img}`}
        width={315}
      />
    );
  }

  render() {
    const { riceId, title, author, description, likes, tags, createdAt } = this.props;
    return (
      <Link
        to={`/rice/${riceId}`}
        className={style.thumbnailWrapper}
      >
        {this.renderThumbnail()}
      </Link>
    );
  }
}

RiceCard.propTypes = propTypes;
RiceCard.defaultProps = defaultProps;

export default RiceCard;
