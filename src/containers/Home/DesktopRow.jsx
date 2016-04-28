import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import style from './style.css';

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  likes: PropTypes.number,
  file: PropTypes.string,
  url: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
};

const defaultProps = {
  description: '',
  likes: 0,
  file: '',
  created_at: '',
  updated_at: '',
};

class DesktopRow extends Component {
  render() {
    const { id, title, description, likes, file, url, created_at, updated_at } = this.props;
    return (
      <tr onClick={this.handleClick} styles={style.row}>
          <td>{likes}</td>
          <td><Link to={`/rice/${id}`}>{title}</Link></td>
          <td>{description}</td>
          <td>{updated_at}</td>
      </tr>
    );
  }
}

DesktopRow.propTypes = propTypes;
DesktopRow.defaultProps = defaultProps;

export default DesktopRow;
