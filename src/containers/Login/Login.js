import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button/Button.js';
import styles from './Login.css';
import { login, clearErrorMessage } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    this.props.login();
  }

  render() {
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
              ref="username"
              placeholder="Username"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              ref="password"
              placeholder="Password"
              className={styles.input}
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
  state => ({ user: state.auth.user }),
  { login, clearErrorMessage }
)(Login);
