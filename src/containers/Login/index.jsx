import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Fieldset from '../../components/Fieldset';
import Label from '../../components/Label';
import TextInput from '../../components/TextInput';
import Checkbox from '../../components/Checkbox';
import Icon from '../../components/Icon';
import style from './style.css';
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
    this.toggleRemember = this.toggleRemember.bind(this);
    this.state = {
      username: '',
      password: '',
      remember: true,
      error: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginInvalid) {
      this.setState({ username: '', password: '', error: null });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, remember } = this.state;

    if (this.props.isFetching) {
      return;
    }
    if (username === '') {
      this.setState({ error: 'Username field is empty.' });
      return;
    }
    if (password === '') {
      this.setState({ error: 'Password field is empty.' });
      return;
    }
    // this.setState({ error: null });
    this.props.login({ username, password, remember });
  }

  toggleRemember() {
    this.setState((prevState) =>
      ({ remember: !prevState.remember })
    );
  }

  renderErrorMessage() {
    if (this.props.loginInvalid || this.state.error) {
      return (
        <div className={style.error}>
          <Icon name="alert-circle" className={style.icon} />
          {this.state.error || 'Invalid username or password.'}
        </div>
      );
    }
    return null;
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className={style.root}>
        <Helmet title="Login | Ricehalla" />
        {this.renderErrorMessage()}
        <h2 className={style.header}>Sign in.</h2>
        <Form
          onSubmit={this.handleSubmit}
          className={this.props.loginInvalid ? style.shake : null}
          noValidate
        >
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
          <Checkbox
            id="rememberme"
            onClick={this.toggleRemember}
            defaultChecked
          >
            Remember me
          </Checkbox>
          <Button
            primary
            disabled={isFetching}
            className={style.submitBtn}
          >
            Log In
          </Button>
          <div className={style.footer}>
            Don&apos;t have an account? <Link to="/register">Sign up</Link>
          </div>
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
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, { login })(Login);
