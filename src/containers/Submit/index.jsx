import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import jwtDecode from 'jwt-decode';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import API_BASE from '../../utils/APIBase';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import Dropzone from '../../components/Dropzone';
import Icon from '../../components/Icon';
import { connect } from 'react-redux';
import { submit as submitRice } from '../../actions/rice';
import { uploadFile, clearUploads } from '../../actions/upload';
import style from './style.css';
import "react-select/dist/react-select.css";
const debug = require('debug')('app:submit');

const propTypes = {
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  upload: PropTypes.shape({
    files: PropTypes.object.isRequired,       // { 'uid': { name: '', mimetype: '' }, ... }
    percentages: PropTypes.object.isRequired, // { 'uid': 20, ... }
    error: PropTypes.object,
  }).isRequired,
  rice: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  submitRice: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
};

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
    };
  }

  componentWillMount() {
    this.props.clearUploads();
  }

  upload(file) {
    // this.setState({ files: this.state.files.concat(file) });
    this.props.uploadFile(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      return;
    }
    if (Object.keys(this.props.upload.files).length === 0) {
      debug('no files in this.props.upload', this.props.upload);
      return;
    }
    const filesArray = Object.keys(this.props.upload.files).map(uid => this.props.upload.files[uid]);
    const fileNames = filesArray.map(obj => obj.name);
    const scrot = filesArray.find(f => /^(jpe?g|png|gif)$/.test(f.name.split('.').pop()));
    if (!scrot) {
      debug('no scrot in filesArray', filesArray);
      return;
    }
    this.props.submitRice({
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
            percentages={this.props.upload.percentages}
            files={this.props.upload.files}
            errors={this.props.upload.errors}
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
          <Button
            className={style.submitBtn}
            primary
            disabled={this.props.rice.isFetching}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

Submit.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    upload: state.upload,
    rice: state.rice,
  };
}

export default connect(mapStateToProps, { submitRice, uploadFile, clearUploads })(Submit);
