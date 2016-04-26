import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
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
  // upload
  fileNames: PropTypes.object.isRequired,
  percentages: PropTypes.object.isRequired,
  uploadErrors: PropTypes.object.isRequired,
  // rice
  isFetching: PropTypes.bool.isRequired,
  riceId: PropTypes.number,
  submissionError: PropTypes.string,
  // actions
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
    const { riceId } = this.props;
    if (typeof riceId !== undefined && riceId !== null) {
      this.timeout = setTimeout(() => {
        this.context.router.push(`/rice/${riceId}`);
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  upload(file) {
    this.setState({ fileName: file.name });
    this.props.uploadFile(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, description, fileName } = this.state;
    this.props.submitRice({ title, description, fileName });
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
            percentages={this.props.percentages}
            fileURLs={this.props.fileNames}
            errors={this.props.uploadErrors}
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
            disabled={this.props.isFetching}
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
  const { errors, ...otherUpload } = state.upload;
  const { error, isFetching, id } = state.rice;
  return {
    ...otherUpload,
    uploadErrors: errors,
    submissionError: error,
    isFetching,
    riceId: id,
  };
}

export default connect(mapStateToProps, { submitRice, uploadFile })(Submit);
