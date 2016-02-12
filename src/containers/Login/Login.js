import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button/Button.js';
import styles from './Login.css';
import { login, clearErrorMessage } from '../../actions';

class Login extends Component {
  constructor(props) {
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
          <h2 className={styles.heading}>Login</h2>
          <div className={styles.inputWrapper}>
            <i className="fa fa-user"></i>
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
            <i className="fa fa-lock"></i>
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
            style={{ width: '80%' }}
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
