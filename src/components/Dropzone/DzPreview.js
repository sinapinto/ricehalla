import React, { Component, PropTypes } from 'react';
import ProgressBar from '../ProgressBar';
import Icon from '../../components/Icon';
import style from './style.css';

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
      return `${(size / kb).toFixed(1)} K`;
    }
    return `${(size / mb).toFixed(1)} M`;
  }

  render() {
    const { name, size, thumbnail, progress, error } = this.props;
    const inner = (
      <div className={style.previewWrapper}>
        {thumbnail
          ? <img src={thumbnail} width={60} height={60} alt={name} className={style.dzThumbnail} />
          : <Icon name="document" size={60} className={style.fileIcon} />
          }
        <div className={style.dzInfo}>
          <p className={style.fileName}>{name}</p>
          <p className={style.fileSize}>{this.humanizeBytes(size)}</p>
          <ProgressBar percent={progress} width={2} hasError={!!error} />
        </div>
      </div>
    );
    if (this.props.file) {
      return (
        <a
          target="_blank"
          href={`https://s3-us-west-2.amazonaws.com/ricehalla/${this.props.file.name}`}
          className={style.dzPreview}
          onClick={this.handleClick}
        >
          {inner}
        </a>
      );
    }
    return <div className={style.dzPreview}>{inner}</div>;
  }
}

DzPreview.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  progress: PropTypes.number,
  file: PropTypes.shape({
    name: PropTypes.string,
    mimetype: PropTypes.string,
  }),
  error: PropTypes.string,
};

DzPreview.defaultProps = {
  progress: 0,
};

export default DzPreview;
