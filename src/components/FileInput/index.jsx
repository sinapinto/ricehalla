import React, { Component, PropTypes } from 'react';
import style from './style.css';

class FileInput extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const input = e.target;
    this.props.handleFile(input.files);
    input.value = '';
  }

  render() {
    const { multiple, hidden, accept } = this.props;
    let className;
    if (hidden) {
      className = style.hidden;
    } else {
      className = style.visible;
    }
    return (
      <input
        type="file"
        className={className}
        onChange={this.handleChange}
        multiple={multiple}
        accept={accept || null}
      />
    );
  }
}

FileInput.propTypes = {
  handleFile: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
};

FileInput.defaultProps = {
  hidden: false,
  multiple: true,
};

export default FileInput;
