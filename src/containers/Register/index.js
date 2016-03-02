import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './Register.css';
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: {
        value: '',
        valid: false,
        message: '',
      },
      password: {
        value: '',
        valid: false,
        message: '',
      },
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
    const username = this.state.username.value;
    const password = this.state.password.value;

    if (username.length < 1 || username.length > 14) {
      this.setState({
        username: {
          value: this.state.value,
          valid: false,
          message: 'Username must be less than 14 characters'
        },
      });
    } else if (password.length < 1 || password.length > 32) {
      this.setState({
        username: {
          value: this.state.username.value,
          valid: true,
          message: ''
        },
        password: {
          value: this.state.password.value,
          valid: false,
          message: 'Password must be between 8 and 32 characters long'
        },
      });
    } else {
      this.setState({
        username: {
          ...this.state.username,
          valid: true,
        },
        password: {
          ...this.state.password,
          valid: true,
        },
      }, () => this.props.register({ username, password }));
    }
  }

  renderErrorMessage() {
    const { registerError } = this.props;
    const { username, password } = this.state;

    if (!username.valid) {
      return (
        <div className={styles.error}>
          {username.message}
        </div>
      );
    }
    if (!password.valid) {
      return (
        <div className={styles.error}>
          {password.message}
        </div>
      );
    }
    if (registerError) {
      return (
        <div className={styles.error}>
          {registerError}
        </div>
      );
    }
    return null;
  }

  render() {
    const { isFetching } = this.state;

    return (
      <div className={styles.wrapper}>
        <Helmet title="Register" />
        <form className={styles.form}>
          <div style={{ marginBottom: '20px' }}>
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x" style={{ color: 'rgb(225,225,225)' }} />
              <i className="fa fa-user fa-stack-1x" style={{ color: 'rgb(189,189,189)' }} />
            </span>
          </div>
          <div className={styles.inputWrapper}>
            <Input
              autoFocus="true"
              type="text"
              onChange={this.handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
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
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

Register.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    registerError: state.registerError,
    isFetching: state.isFetching,
  };
}

export default connect(mapStateToProps, { register })(Register);
