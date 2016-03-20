import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Button from '../../components/Button';
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      usernameValid: false,
      passwordValid: false,
      error: '',
    };
  }

  handleChange(e) {
    if (e.target.type === 'password') {
      this.setState({
        password: e.target.value
      });
    } else {
      this.setState({
        username: e.target.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    e.target.blur();
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
      <div className={`${styles.wrapper} ${isFetching && styles.opaque}`}>
        <Helmet title="Login | ricehalla" />
        <form className={styles.form}>
          <div style={{ marginBottom: '20px' }}>
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x" style={{ color: 'rgb(225,225,225)' }} />
              <i className="fa fa-user fa-stack-1x" style={{ color: 'rgb(189,189,189)' }} />
            </span>
          </div>
          <div className={styles.inputWrapper}>
            <TextInput
              autoFocus
              type="text"
              onChange={this.handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <TextInput
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              required
            />
          </div>
          {this.renderErrorMessage()}
          <Button
            disabled={isFetching}
            theme="primary"
            handleClick={this.handleSubmit}
            width={'100%'}
          >
            Sign In
          </Button>
        </form>
      </div>
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
