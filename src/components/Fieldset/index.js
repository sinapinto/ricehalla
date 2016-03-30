import React, { Component, PropTypes } from 'react';
import Icon from '../Icon/index.js';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string,
};

class Fieldset extends Component {
  renderErrorMessage() {
    return this.props.errorMessage ?
      <div className={styles.errorMessage}>
        <Icon icon="alert-circle" className={styles.icon} />
        {this.props.errorMessage}
      </div> :
      null;
  }

  render() {
    const { children, ...other } = this.props;
    return (
      <fieldset {...other} className={styles.fieldset}>
        {children}
        {this.renderErrorMessage()}
      </fieldset>
    );
  }
}

Fieldset.propTypes = propTypes;

export default Fieldset;
