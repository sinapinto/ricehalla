import React, { Component } from 'react';
import Input from '../../components/Input/Input.js';
import FormButton from '../../components/FormButton/FormButton.js';
import styles from './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <h2 className={styles.heading}>Login</h2>
          <Input placeholder="Username" icon="fa-user" />
          <Input type="password" placeholder="Password" icon="fa-lock" />
          <FormButton handleClick={this.handleSubmit}>Sign In</FormButton>
        </form>
      </div>
    );
  }
}

export default Login;
