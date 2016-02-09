import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Form.css';

const Form = ({ ...other }) => (
  <div className={styles.wrapper}>
    <div className={styles.column}>
      <h2 className={styles.header}></h2>
      <form className={styles.form}>
        <div className={styles.field}>
          <div className={styles.input}>
            <i className="fa fa-user" ></i>
            <input type="text" placeholder="username" />
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.input}>
            <i className="fa fa-lock" ></i>
            <input type="text" placeholder="password" />
          </div>
        </div>
      </form>
    </div>
  </div>
);

Form.propTypes = {
};

export default Form;
