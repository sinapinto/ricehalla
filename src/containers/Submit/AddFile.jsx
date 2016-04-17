import React, { Component, PropTypes } from 'react';
import Label from '../../components/Label';
import Button from '../../components/Button';
import style from './style.css';

const propTypes = {
  upload: PropTypes.func.isRequired,
};

class AddFile extends Component {
  constructor() {
    super();
    this.handleFiles = this.handleFiles.bind(this);
    this.handleAddFileClick = this.handleAddFileClick.bind(this);
  }

  handleAddFileClick() {
    this.refs.file.click();
  }

  handleFiles(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    this.props.upload(data);
  }

  render() {
    return (
      <div className={style.add}>
        <Label htmlFor="file">Files</Label>
        <br />
        <Button outline onClick={this.handleAddFileClick}>Add File</Button>
        <input
          type="file"
          ref="file"
          onChange={this.handleFiles}
          hidden
          multiple
        />
      </div>
    );
  }
}

AddFile.propTypes = propTypes;

export default AddFile;
