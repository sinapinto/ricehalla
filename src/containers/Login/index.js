import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Button from '../../components/Button';
import FormContainer from '../../components/FormContainer';
import Fieldset from '../../components/Fieldset';
import Field from '../../components/Field';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import styles from './styles.css';
import { login } from '../../actions/auth';

const propTypes = {
  loginError: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
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
    e.target.blur();
    this.submit();
  }

  submit() {
    const { username, password } = this.state;
    const { isFetching } = this.props;

    if (isFetching) {
      return undefined;
    }

    this.setState({
      usernameValid: true,
      passwordValid: true,
      error: ''
    }, () => this.props.login({ username, password }));

    return undefined;
  }

  renderErrorMessage() {
    const { loginError } = this.props;
    const { usernameValid, passwordValid, error } = this.state;

    if (!usernameValid || !passwordValid) {
      return <div className={styles.error}>{error}</div>;
    }
    if (loginError) {
      return <div className={styles.error}>{loginError}</div>;
    }
    return null;
  }

  render() {
    const { isFetching } = this.props;

    return (
      <FormContainer>
        <Helmet title="Login | ricehalla" />
        <h2 className={styles.header}>Sign in.</h2>
        <Fieldset>
          <Field
            label={<Label text="Username" htmlFor="username" />}
            input={<TextInput
              autoFocus
              type="text"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              id="username"
              required
            />}
          />
          <Field
            label={<Label text="Password" htmlFor="password" />}
            input={<TextInput
              type="password"
              id="password"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
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
            Sign In
          </Button>
        </Fieldset>
      </FormContainer>
    );
  }
}

Login.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
    isFetching: state.auth.isFetching,
  };
}

export default connect(mapStateToProps, { login })(Login);
