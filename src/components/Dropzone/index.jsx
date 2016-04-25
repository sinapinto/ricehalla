import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import FileInput from '../FileInput';
import DzPreview from './DzPreview';
import style from './style.css';

const propTypes = {
  action: PropTypes.func.isRequired,
  fileURLs: PropTypes.object,
  errors: PropTypes.object,
  percentages: PropTypes.object,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  multiple: true,
};

const genUID = (() => {
  let uid = +new Date;
  return () => uid++;
})();

class Dropzone extends Component {
  constructor() {
    super();
    this.handleDrop = this.handleDrop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.state = {
      uploads: [],
    };
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.handleFiles(e.dataTransfer.files);
  }

  handleClick() {
    // replay click to the file input
    const input = findDOMNode(this.refs.fileInput);
    if (input) {
      input.click();
    }
  }

  handleFiles(fileList) {
    const files = Array.prototype.slice.call(fileList);
    for (let i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
    }
  }

  uploadFile(file) {
    const uid = genUID();
    file.uid = uid;
    this.props.action(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      this.setState({
        uploads: this.state.uploads.concat({
          uid,
          file,
          thumbnail: ev.target.result,
        })
      });
    };
    reader.readAsDataURL(file);
  }

  renderPreviews() {
    return this.state.uploads.map((upload, i) => (
      <DzPreview
        name={upload.file.name}
        size={upload.file.size}
        thumbnail={upload.thumbnail}
        progress={this.props.percentages[upload.uid]}
        url={this.props.fileURLs[upload.uid]}
        error={this.props.errors[upload.uid]}
        key={i}
      />
    ));
  }

  render() {
    return (
      <div
        className={style.dropzone}
        onDrop={this.handleDrop}
        onClick={this.handleClick}
      >
        <FileInput
          ref="fileInput"
          handleFile={this.handleFiles}
          accept={this.props.accept || null}
          multiple={this.props.multiple}
          hidden
        />
        {this.renderPreviews()}
        {!this.state.uploads.length && this.props.children}
      </div>
    );
  }
}

Dropzone.propTypes = propTypes;
Dropzone.defaultProps = defaultProps;

export default Dropzone;
