import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import debounce from '../../utils/debounce';
import { validateEmail, validateUsername, validatePassword } from '../../utils/validation';
import Button from '../../components/Button';
import Form from '../../components/Form';
import TextInput from '../../components/TextInput';
import Fieldset from '../../components/Fieldset';
import Label from '../../components/Label';
import styles from './styles.css';
import { register } from '../../actions/auth';

const propTypes = {
  registerError: PropTypes.string,
  isFetching: PropTypes.bool,
  register: PropTypes.func.isRequired,
};

class Register extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validateDebounced = debounce(this.validate.bind(this), 1500);
    this.state = {
      email: {
        value: '',
        valid: false,
        isValidating: false,
        error: null,
      },
      username: {
        value: '',
        valid: false,
        isValidating: false,
        error: null,
      },
      password: {
        value: '',
        valid: false,
        isValidating: false,
        error: null,
      },
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: {
        value,
        valid: false,
        isValidating: true,
        error: null,

      }
    });
    this.validateDebounced();
  }

  handleBlur() {
    this.validate();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.isFetching) {
      return undefined;
    }
    this.setState({
      email: { ...this.state.email, isValidating: true },
      username: { ...this.state.username, isValidating: true },
      password: { ...this.state.password, isValidating: true },
    }, () => this.validate());

    if (Object.keys(this.state).every(field => this.state[field].valid)) {
      this.props.register({
        email: this.state.email.value.replace(/\s\+/g, ''),
        username: this.state.username.value,
        password: this.state.password.value,
      });
    }
  }

  validate() {
    const { email, username, password } = this.state;
    if (email.isValidating && this.isValidEmail(email.value)) {
      this.setState({
        email: {
          value: email.value,
          valid: true,
          isValidating: true,
          error: null,
        }
      });
    }
    if (username.isValidating && this.isValidUsername(username.value)) {
      this.setState({
        username: {
          value: username.value,
          valid: true,
          isValidating: true,
          error: null,
        }
      });
    }
    if (password.isValidating && this.isValidPassword(password.value)) {
      this.setState({
        password: {
          value: password.value,
          valid: true,
          isValidating: true,
          error: null,
        }
      });
    }
  }

  isValidEmail(email) {
    const error = validateEmail(email);
    if (error) {
      this.setState({
        email: {
          value: email,
          valid: false,
          isValidating: true,
          error,
        }
      });
    }
    return !error;
  }

  isValidUsername(username) {
    const error = validateUsername(username);
    if (error) {
      this.setState({
        username: {
          value: username,
          valid: false,
          isValidating: true,
          error,
        }
      });
    }
    return !error;
  }

  isValidPassword(password) {
    const error = validatePassword(password);
    if (error) {
      this.setState({
        password: {
          value: password,
          valid: false,
          isValidating: true,
          error,
        }
      });
    }
    return !error;
  }

  render() {
    return (
      <div className={styles.root}>
        <Helmet title="Register | ricehalla" />
        <h2 className={styles.header}>Create an account.</h2>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Fieldset errorMessage={this.state.email.error}>
            <Label htmlFor="email">Your email address</Label>
            <TextInput
              id="email"
              type="email"
              name="email"
              value={this.state.email.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              invalid={!!this.state.email.error}
              valid={this.state.email.valid}
              disabled={this.props.isFetching}
              autoFocus
            />
          </Fieldset>
          <Fieldset errorMessage={this.state.username.error}>
            <Label htmlFor="username">Choose a username</Label>
            <TextInput
              id="username"
              name="username"
              value={this.state.username.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              invalid={!!this.state.username.error}
              valid={this.state.username.valid}
              disabled={this.props.isFetching}
            />
          </Fieldset>
          <Fieldset errorMessage={this.state.password.error}>
            <Label htmlFor="password">Choose a password</Label>
            <TextInput
              id="password"
              name="password"
              type="password"
              value={this.state.password.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              invalid={!!this.state.password.error}
              valid={this.state.password.valid}
              disabled={this.props.isFetching}
            />
          </Fieldset>
          <Button theme="primary" disabled={this.props.isFetching} width={'100%'}>Sign Up</Button>
        </Form>
      </div>
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
