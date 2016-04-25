import React, { Component, PropTypes } from 'react';
import ProgressBar from '../ProgressBar';
import style from './style.css';

const propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  progress: PropTypes.number,
  url: PropTypes.string,
  error: PropTypes.string,
};

const defaultProps = {
  progress: 0,
};

class DzPreview extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
  }

  humanizeBytes(size) {
    const mb = 1000000;
    const kb = 1000;
    if (size <= kb) {
      return `${size} B`;
    }
    if (size <= mb) {
      return `${this.truncate(size / kb, 1)} K`;
    }
    return `${this.truncate(size / mb, 1)} M`;
  }

  truncate(num, decimals = 0) {
    const v = num * 10 ** decimals;
    return Math.floor(v) / 10 ** decimals;
  }

  render() {
    const { name, size, thumbnail, progress, error } = this.props;
    const inner = (
      <div style={{ display: 'flex', width: '100%' }}>
        <img src={thumbnail} width={60} height={60} alt={name} className={style.dzThumbnail} />
        <div className={style.dzInfo}>
          <p>{name}</p>
          <p>{this.humanizeBytes(size)}</p>
          <ProgressBar percent={progress} width={5} fail={!!error} />
        </div>
      </div>
    );
    if (this.props.url) {
      return (
        <a target="_blank" href={`/uploads/${this.props.url}`}
          className={style.dzPreview} onClick={this.handleClick}
        >
          {inner}
        </a>
      );
    }
    return <div className={style.dzPreview}>{inner}</div>;
  }
}

DzPreview.propTypes = propTypes;
DzPreview.defaultProps = defaultProps;

export default DzPreview;
