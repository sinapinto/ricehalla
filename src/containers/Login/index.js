import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Button from '../../components/Button';
import styles from './Login.css';
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
      username: {
        value: '',
        valid: false,
      },
      password: {
        value: '',
        valid: false,
      },
      error: '',
    };
  }

  handleChange(e) {
    if (e.target.type === 'password') {
      this.setState({
        password: {
          ...this.state.password,
          value: e.target.value
        }
      });
    } else {
      this.setState({
        username: {
          ...this.state.username,
          value: e.target.value
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.setState({
      username: {
        ...username,
        valid: true,
      },
      password: {
        ...password,
        valid: true,
      },
      message: ''
    }, () => this.props.login(username.value, password.value));
  }

  renderErrorMessage() {
    const { loginError } = this.props;
    const { username, password, error } = this.state;

    if (!username.valid || !password.valid) {
      return <div className={styles.error}>{error}</div>;
    }
    if (loginError) {
      return <div className={styles.error}>{loginError}</div>;
    }
    return null;
  }

  render() {
    const { invalidUsername, invalidPassword, isFetching } = this.state;

    return (
      <div className={styles.wrapper}>
        <Helmet title="Login" />
        <form className={styles.form}>
          <div style={{ marginBottom: '20px' }}>
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x" style={{ color: 'rgb(225,225,225)' }} />
              <i className="fa fa-user fa-stack-1x" style={{ color: 'rgb(189,189,189)' }} />
            </span>
          </div>
          <div className={styles.inputWrapper}>
            <input
              autoFocus="true"
              type="text"
              onChange={this.handleChange}
              placeholder="Username"
              className={`${styles.input} ${invalidUsername && styles.invalid}`}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              className={`${styles.input} ${invalidPassword && styles.invalid}`}
              required
            />
          </div>
          {this.renderErrorMessage()}
          {isFetching && 'loading...'}
          <Button
            theme="primary"
            handleClick={this.handleSubmit}
            style={{ width: '100%' }}
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
