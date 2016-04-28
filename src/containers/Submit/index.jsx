import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import jwtDecode from 'jwt-decode';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import Dropzone from '../../components/Dropzone';
import Icon from '../../components/Icon';
import { connect } from 'react-redux';
import { submit as submitRice } from '../../actions/rice';
import { uploadFile } from '../../actions/upload';
import style from './style.css';

const propTypes = {
  upload: PropTypes.shape({
    fileNames: PropTypes.object.isRequired,
    percentages: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  rice: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    submitted: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
  userId: PropTypes.number.isRequired,
  submitRice: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
};

const contextTypes = {
  router: PropTypes.object
};

class Submit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      title: '',
      description: '',
      fileName: '',
    };
  }

  componentDidUpdate() {
    const { id } = this.props.rice.submitted;
    if (typeof id !== 'undefined' && id !== null) {
      this.context.router.push(`/rice/${id}`);
    }
  }

  upload(file) {
    this.setState({ fileName: file.name });
    this.props.uploadFile(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fileNames } = this.props.upload;
    const files = Object.keys(fileNames).map(uid => this.props.upload.fileNames[uid]);
    this.props.submitRice({
      userId: this.props.userId,
      title: this.state.title,
      description: this.state.description,
      files,
    });
  }

  handleTextInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
            fileURLs={this.props.upload.fileNames}
            errors={this.props.upload.errors}
          >
            <Icon name="upload" size={64} className={style.dzIcon} />
            <p className={style.dzHeader}>drop files here or click to upload</p>
          </Dropzone>
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
Submit.contextTypes = contextTypes;

function mapStateToProps(state) {
  const { auth: { token } } = state;
  const userId = token ? jwtDecode(token).id : null;
  return {
    upload: state.upload,
    rice: state.rice,
    userId,
  };
}

export default connect(mapStateToProps, { submitRice, uploadFile })(Submit);
