import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import style from './style.css';

const propTypes = {
  riceId: PropTypes.number.isRequired,
  scrot: PropTypes.string.isRequired,
};

class Thumbnail extends Component {
  render() {
    return (
      <Link
        to={`/rice/${this.props.riceId}`}
        className={style.thumbnailWrapper}
      >
        <img
          className={style.thumbnailImage}
          src={`/uploads/${this.props.scrot}`}
          width={315}
        />
      </Link>
    );
  }
}

Thumbnail.propTypes = propTypes;

export default Thumbnail;
