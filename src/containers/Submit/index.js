import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import _debug from 'debug';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import { connect } from 'react-redux';
import { submitRice } from '../../actions/rice';
import styles from './styles.css';

const debug = _debug('app:submit');

const propTypes = {
  submitRice: PropTypes.func.isRequired,
};

class Submit extends Component {
  constructor() {
    super();
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      title: '',
      cateogry: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleDrop(file) {
    debug(file);
  }

  render() {
    return (
      <div className={styles.root}>
        <Helmet title="Submit" />
        <h2 className={styles.header}>Post your rice.</h2>

        <Form onSubmit={this.handleSubmit} style={{ maxWidth: '500px' }} noValidate>

          <Label htmlFor="title">Title</Label>
          <TextInput
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

        <Button theme="primary">
          Submit
        </Button>

      </Form>
    </div>
    );
  }
}

Submit.propTypes = propTypes;

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { submitRice })(Submit);
