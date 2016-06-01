import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import fetch from 'isomorphic-fetch';
import API_BASE from '../../utils/APIBase';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import Dropzone from '../../components/Dropzone';
import Icon from '../../components/Icon';
import { connect } from 'react-redux';
import { submitPost } from '../../actions/post';
import { uploadFile } from '../../actions/upload';
import style from './style.css';

class Submit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.upload = this.upload.bind(this);
    this.fetchTags = this.fetchTags.bind(this);
    this.state = {
      title: '',
      description: '',
      // files: [],
      tags: '',
      errorMessage: null,
    };
  }

  upload(file) {
    // this.setState({ files: this.state.files.concat(file) });
    this.props.uploadFile(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.title) {
      this.setState({ errorMessage: 'Please give your post a title.' });
      return;
    }
    if (Object.keys(this.props.filesByUid).length === 0) {
      this.setState({ errorMessage: 'You must upload at least one file to be able to submit.' });
      return;
    }
    const filesArray = Object.keys(this.props.filesByUid)
      .map(uid => this.props.filesByUid[uid]);
    const fileNames = filesArray.map(obj => obj.name);
    const scrot = filesArray.find(f => /^(jpe?g|png|gif)$/.test(f.name.split('.').pop()));
    if (!scrot) {
      this.setState({ errorMessage: 'You must upload an image to be able to submit.' });
      return;
    }
    this.props.submitPost({
      userId: this.props.userId,
      title: this.state.title,
      description: this.state.description,
      tags: this.state.tags,
      scrot: scrot.name,
      files: fileNames,
    });
  }

  handleTextInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  fetchTags(input) {
    return fetch(`${API_BASE}/api/v1/tag`)
      .then(res => res.json())
      .then(res => {
        const options = res.map(tag => {
          return {
            value: tag.name,
            label: tag.name,
          };
        });
        return { options, complete: true };
      });
  }

  handleTags(tags) {
    this.setState({ tags });
  }

  render() {
    return (
      <div className={style.root}>
        <Helmet title="Submit" />
        <h2 className={style.header}>Post your rice</h2>
        <Form onSubmit={this.handleSubmit} className={style.form}>
          <Dropzone
            action={this.upload}
            percentages={this.props.progressByUid}
            files={this.props.filesByUid}
            errors={this.props.errorsByUid}
          >
            <Icon name="images" size={100} className={style.dzIcon} />
            <p className={style.dzHeader}>Drop files here or click to upload</p>
            <p className={style.dzSubHeader}>Limit 3 MB per file</p>
          </Dropzone>
          <div className={style.inputWrapper}>
            <Label htmlFor="title" className={style.label}>Title</Label>
            <TextInput
              id="title"
              name="title"
              className={style.input}
              value={this.state.title}
              onChange={this.handleTextInputChange}
            />
          </div>
          <div className={style.inputWrapper}>
            <Label className={style.label}>Tags</Label>
            <Select
              multi
              joinValues
              allowCreate
              name="tags"
              className={style.input}
              value={this.state.tags}
              onChange={this.handleTags}
              asyncOptions={this.fetchTags}
            />
          </div>
          <Label htmlFor="description" className={style.label}>Description</Label>
          <TextInput
            multiline
            spellCheck={false}
            height={200}
            id="description"
            name="description"
            placeholder="Enter markdown description..."
            className={style.input}
            value={this.state.description}
            onChange={this.handleTextInputChange}
          />
          <div className={style.footer}>
            {this.state.errorMessage ?
              <span className={style.error}>
                <Icon name="alert-circle" className={style.errorIcon} />
                <span>{this.state.errorMessage}</span>
              </span>
              : <div />}
            <Button
              success
              large
              disabled={this.props.isSubmitting}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

Submit.propTypes = {
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  filesByUid: PropTypes.object.isRequired,
  progressByUid: PropTypes.object.isRequired,
  errorsByUid: PropTypes.object,
  isSubmitting: PropTypes.bool.isRequired,
  submitPost: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    filesByUid: state.upload.filesByUid,
    progressByUid: state.upload.progressByUid,
    errorsByUid: state.upload.errorsByUid,
    isSubmitting: state.post.isFetching,
  };
}

export default connect(mapStateToProps, {
  submitPost,
  uploadFile,
})(Submit);
