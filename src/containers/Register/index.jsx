import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import debounce from '../../utils/debounce';
import { validateEmail, validateUsername, validatePassword } from '../../utils/validation';
import { register, clearAuthErrors } from '../../actions/auth';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Form from '../../components/Form';
import TextInput from '../../components/TextInput';
import Fieldset from '../../components/Fieldset';
import Label from '../../components/Label';
import style from './style.css';

const propTypes = {
  registerError: PropTypes.string,
  isFetching: PropTypes.bool,
  register: PropTypes.func.isRequired,
  clearAuthErrors: PropTypes.func.isRequired,
};

class Register extends Component {
  constructor(props) {
    super(props);
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

  componentWillMount() {
    this.props.clearAuthErrors();
  }

  componentWillUnmount() {
    this.validateDebounced.cancel();
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
      return;
    }
    this.setState({
      email: { ...this.state.email, isValidating: true },
      username: { ...this.state.username, isValidating: true },
      password: { ...this.state.password, isValidating: true },
    }, () => this.validate(() => {
      if (this.canSubmit()) {
        this.props.register({
          email: this.state.email.value.replace(/\s+/g, ''),
          username: this.state.username.value,
          password: this.state.password.value,
        });
      }
    }));
  }

  canSubmit() {
    const { email, username, password } = this.state;
    const { isFetching } = this.props;
    return email.valid && username.valid && password.valid && !isFetching;
  }

  validate(cb) {
    const { email, username, password } = this.state;
    const newState = {};

    if (email.isValidating) {
      const error = validateEmail(email.value);
      newState.email = {
        value: email.value,
        valid: !error,
        isValidating: true,
        error,
      };
    }
    if (username.isValidating) {
      const error = validateUsername(username.value);
      newState.username = {
        value: username.value,
        valid: !error,
        isValidating: true,
        error,
      };
    }
    if (password.isValidating) {
      const error = validatePassword(password.value);
      newState.password = {
        value: password.value,
        valid: !error,
        isValidating: true,
        error,
      };
    }

    if (Object.keys(newState).length > 0) {
      this.setState(newState, cb);
    }
  }

  renderErrorMessage() {
    if (this.props.registerError) {
      return (
        <div className={style.error}>
          <Icon name="alert-circle" className={style.icon} />
          {this.props.registerError}
        </div>
      );
    }
    return null;
  }

  render() {
    const emailInvalid = !!this.state.email.error || !!this.props.registerError;
    let emailValid = this.state.email.valid;
    if (emailInvalid) {
      emailValid = false;
    }
    const usernameInvalid = !!this.state.username.error || !!this.props.registerError;
    let usernameValid = this.state.username.valid;
    if (usernameInvalid) {
      usernameValid = false;
    }
    const passwordInvalid = !!this.state.password.error || !!this.props.registerError;
    let passwordValid = this.state.password.valid;
    if (passwordInvalid) {
      passwordValid = false;
    }
    return (
      <div className={style.root}>
        <Helmet title="Register | Ricehalla" />
        {this.renderErrorMessage()}
        <h2 className={style.header}>Create an account.</h2>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Fieldset errorMessage={this.state.email.error}>
            <Label htmlFor="email">Your email address</Label>
            <TextInput
              id="email"
              name="email"
              value={this.state.email.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              invalid={emailInvalid}
              valid={emailValid}
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
              invalid={usernameInvalid}
              valid={usernameValid}
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
              invalid={passwordInvalid}
              valid={passwordValid}
              disabled={this.props.isFetching}
            />
          </Fieldset>
          <Button
            primary
            disabled={this.props.isFetching}
            className={style.submitBtn}
          >
            Sign Up
          </Button>
          <div className={style.footer}>
            Already have an account? <Link to="/login">Log in</Link>
          </div>
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

export default connect(mapStateToProps, { register, clearAuthErrors })(Register);
