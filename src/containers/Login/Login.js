import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import Button from '../../components/Button/Button.js';
import styles from './Login.css';
import { login } from '../../actions/auth.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      invalidUsername: false,
      invalidPassword: false,
    };
  }

  handleChange(e) {
    if (e.target.type === 'password') {
      this.setState({ password: e.target.value });
    } else {
      this.setState({ username: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    if (validator.isNull(username) || !validator.isAlphanumeric(username)) {
      this.refs.username.focus();
      this.setState({
        invalidUsername: true
      });
    } else if (validator.isNull(password) || !validator.isAlphanumeric(password)) {
      this.refs.password.focus();
      this.setState({
        invalidUsername: false,
        invalidPassword: true,
      });
    } else {
      this.setState({
        invalidUsername: false,
        invalidPassword: false,
      });
      this.props.login(username, password);
    }
  }

  render() {
    const { invalidUsername, invalidPassword } = this.state;

    return (
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <div style={{ marginBottom: '20px' }}>
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x" style={{ color: 'rgb(225,225,225)' }}></i>
              <i className="fa fa-user fa-stack-1x" style={{ color: 'rgb(189,189,189)' }}></i>
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

export default connect(
  state => state,
  { login }
)(Login);

Login.propTypes = {
  login: PropTypes.func.isRequired,
};
