import React, { Component, PropTypes } from 'react';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string,
};

class Fieldset extends Component {
  renderErrorMessage() {
    return this.props.errorMessage ?
      <div className={styles.errorMessage}>
        <i className="fa fa-exclamation-circle"></i>
        {this.props.errorMessage}
      </div> :
      null;
  }

  render() {
    return (
      <fieldset className={styles.fieldset}>
        {this.props.children}
        {this.renderErrorMessage()}
      </fieldset>
    );
  }
}

Fieldset.propTypes = propTypes;

export default Fieldset;
