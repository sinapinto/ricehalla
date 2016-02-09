import React, { Component } from 'react';
import Form from '../../components/Form/Form.js';
import styles from './Login.css';

class Login extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Form />
      </div>
    );
  }
}

export default Login;
