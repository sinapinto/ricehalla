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
      count: PropTypes.number.isRequired,
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
    if (typeof img === 'undefined') {
      // TODO: should rice without an image be valid?
      img = 'default.jpg';
    }
    return <img src={`/uploads/${img}`} height={100} />;
  }

  render() {
    const { riceId, title, author, description, likes, tags, createdAt } = this.props;
    return (
      <tr styles={style.row}>
          <td>{likes}</td>
          <td>{this.renderThumbnail()}</td>
          <td><Link to={`/rice/${riceId}`}>{author}</Link></td>
          <td>{title}</td>
          <TagList tags={tags} />
      </tr>
    );
  }
}

RiceCard.propTypes = propTypes;
RiceCard.defaultProps = defaultProps;

export default RiceCard;
