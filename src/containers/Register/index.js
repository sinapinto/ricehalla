import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Button from '../../components/Button';
import FormContainer from '../../components/FormContainer';
import TextInput from '../../components/TextInput';
import Fieldset from '../../components/Fieldset';
import Field from '../../components/Field';
import Label from '../../components/Label';
import styles from './styles.css';
import { register } from '../../actions/auth';

const propTypes = {
  registerError: PropTypes.string,
  isFetching: PropTypes.bool,
  register: PropTypes.func.isRequired,
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      username: '',
      password: '',
      emailValid: false,
      usernameValid: false,
      passwordValid: false,
      error: '',
    };
  }

  handleChange(field, value) {
    this.setState({ [field]: value });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.submit();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.submit();
  }

  submit() {
    const { username, password } = this.state;

    if (this.props.isFetching) {
      return undefined;
    }

    if (username > 14) {
      this.setState({
        username: this.state,
        usernameValid: false,
        error: 'Username must be no more than 14 characters'
      });
    } else if (password > 32) {
      this.setState({
        username: this.state.username,
        usernameValid: true,
        password: this.state.password,
        passwordValid: false,
        error: 'Password must be between 8 and 32 characters long'
      });
    } else {
      this.setState({
        usernameValid: true,
        passwordValid: true,
      }, () => this.props.register({ username, password }));
    }
    return undefined;
  }

  renderErrorMessage() {
    const { registerError } = this.props;
    const { usernameValid, passwordValid, emailValid, error } = this.state;
    if (!usernameValid || !passwordValid || !emailValid) {
      return <div className={styles.error}>{error}</div>;
    }
    if (registerError) {
      return <div className={styles.error}>{registerError}</div>;
    }
    return null;
  }

  render() {
    const { isFetching } = this.props;
    const { email, username, password } = this.state;

    return (
      <FormContainer>
        <Helmet title="Register | ricehalla" />
        <h2 className={styles.header}>Create an account.</h2>
        <Fieldset>
          <Field
            label={<Label text="Your email address" htmlFor="email" />}
            input={<TextInput
              type="email"
              value={email}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              id="email"
              autoFocus
              disabled={isFetching}
              required
            />}
          />
          <Field
            label={<Label text="Choose a username" htmlFor="username" />}
            input={<TextInput
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              value={username}
              id="username"
              disabled={isFetching}
              required
            />}
          />
          <Field
            label={<Label text="Choose a password" htmlFor="password" />}
            input={<TextInput
              type="password"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              value={password}
              id="password"
              disabled={isFetching}
              required
            />}
          />
          {this.renderErrorMessage()}
          <Button
            theme="primary"
            disabled={isFetching}
            handleClick={this.handleSubmit}
            width={'100%'}
          >
            Sign Up
          </Button>
        </Fieldset>
      </FormContainer>
    );
  }
}

Register.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    registerError: state.auth.registerError,
    isFetching: state.auth.isFetching,
  };
}

export default connect(mapStateToProps, { register })(Register);
