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
  upload: PropTypes.shape({
    files: PropTypes.object.isRequired,       // { 'uid': { name: '', mimetype: '' }, ... }
    percentages: PropTypes.object.isRequired, // { 'uid': 20, ... }
    error: PropTypes.object,
  }).isRequired,
  rice: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    errors: PropTypes.array,
  }).isRequired,
  userId: PropTypes.number.isRequired,
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
    const scrot = filesArray.find(f => /^(jpg|png|gif)$/.test(f.name.split('.').pop()));
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
        <h2 className={style.header}>Post your rice.</h2>
        <Form onSubmit={this.handleSubmit} className={style.form}>
          <Label htmlFor="title">Title</Label>
          <TextInput
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleTextInputChange}
          />
          <Dropzone
            action={this.upload}
            percentages={this.props.upload.percentages}
            files={this.props.upload.files}
            errors={this.props.upload.errors}
          >
            <Icon name="upload" size={64} className={style.dzIcon} />
            <p className={style.dzHeader}>drop files here or click to upload (max 3MB/file)</p>
          </Dropzone>
          <Label>Tags</Label>
          <Select
            multi
            joinValues
            allowCreate
            name="tags"
            value={this.state.tags}
            onChange={this.handleTags}
            asyncOptions={this.fetchTags}
          />
          <Label htmlFor="description">Description</Label>
          <TextInput
            multiline
            height={130}
            id="description"
            name="description"
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
  const { auth: { token } } = state;
  const userId = token ? jwtDecode(token).id : null;
  return {
    upload: state.upload,
    rice: state.rice,
    userId,
  };
}

export default connect(mapStateToProps, { submitRice, uploadFile, clearUploads })(Submit);
