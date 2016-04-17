import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import AddFile from './AddFile';
import Icon from '../../components/Icon';
import { connect } from 'react-redux';
import { submitRice } from '../../actions/rice';
import { upload } from '../../actions/upload';
import styles from './styles.css';

const propTypes = {
  submitRice: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  response: PropTypes.object,
  error: PropTypes.string,
};

class Submit extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      title: '',
      description: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  renderErrorMessage() {
    if (this.props.error) {
      return (
        <div className={styles.error}>
          <Icon name="alert-circle" className={styles.icon} />
          {this.props.error || 'Upload error. Please try again.'}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className={styles.root}>
        <Helmet title="Submit" />
        <h2 className={styles.header}>Post your rice.</h2>
        <Form onSubmit={this.handleSubmit} style={{ maxWidth: '500px' }}>
          <Label htmlFor="title">Title</Label>
          <TextInput
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <AddFile upload={this.props.upload} />
          {this.renderErrorMessage()}
          {this.props.response &&
            <div>
              {this.props.response.name}
              {' '}
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
            onChange={this.handleChange}
          />
          <Button className={styles.submitBtn} primary>Submit</Button>
        </Form>
      </div>
    );
  }
}

Submit.propTypes = propTypes;

function mapStateToProps(state) {
  return state.upload;
}

export default connect(mapStateToProps, { submitRice, upload })(Submit);
