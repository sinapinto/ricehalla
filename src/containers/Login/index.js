import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Fieldset from '../../components/Fieldset';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import styles from './styles.css';
import { login } from '../../actions/auth';

const propTypes = {
  loginInvalid: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      error: null,
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    if (this.props.isFetching) {
      return undefined;
    }
    if (username === '') {
      this.setState({ error: 'Username field is empty.' });
      return undefined;
    }
    if (password === '') {
      this.setState({ error: 'Password field is empty.' });
      return undefined;
    }
    this.setState({ error: null });
    this.props.login({ username, password });
  }

  renderErrorMessage() {
    return this.props.loginInvalid ?
      <div className={styles.error}>
        <i className="fa fa-exclamation-circle"></i>
        {this.state.error || 'Invalid username or password.'}
      </div> :
      null;
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className={styles.root}>
        <Helmet title="Login | ricehalla" />
        {this.renderErrorMessage()}
        <Form onSubmit={this.handleSubmit} noValidate>
          <Fieldset>
            <Label htmlFor="username">Username or email</Label>
            <TextInput
              autoFocus
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="password">Password</Label>
            <TextInput
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Fieldset>
          <Button theme="primary" disabled={isFetching} width={'100%'}>Sign In</Button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    loginInvalid: state.auth.loginInvalid,
    isFetching: state.auth.isFetching,
  };
}

export default connect(mapStateToProps, { login })(Login);
