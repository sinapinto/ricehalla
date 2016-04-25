import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import Dropzone from '../../components/Dropzone';
import Icon from '../../components/Icon';
import { connect } from 'react-redux';
import { submitRice } from '../../actions/rice';
import { uploadFile } from '../../actions/upload';
import style from './style.css';

const propTypes = {
  submitRice: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  fileNames: PropTypes.object.isRequired,
  percentages: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  response: PropTypes.object,
};

class Submit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this._uploadFile = this._uploadFile.bind(this);
    this.state = {
      title: '',
      description: '',
      fileName: '',
    };
  }

  _uploadFile(file) {
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
            action={this._uploadFile}
            percentages={this.props.percentages}
            fileURLs={this.props.fileNames}
            errors={this.props.errors}
          >
            <Icon name="upload" size={64} className={style.dzIcon} />
            <p className={style.dzHeader}>drop files here or click to upload</p>
          </Dropzone>
          {this.props.response &&
            <div>
              {this.state.fileName}
              <img
                src={`uploads/${this.props.response.name}`}
                width={100}
                height={100}
                alt="upload"
              />
            </div>}
          <Label htmlFor="description">Description</Label>
          <TextInput
            multiline
            height={130}
            id="description"
            name="description"
            value={this.state.description}
            onChange={this.handleTextInputChange}
          />
          <Button className={style.submitBtn} primary style={{ float: 'right' }}>Submit</Button>
        </Form>
      </div>
    );
  }
}

Submit.propTypes = propTypes;

function mapStateToProps(state) {
  return state.upload;
}

export default connect(mapStateToProps, { submitRice, uploadFile })(Submit);
