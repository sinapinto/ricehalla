import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';
import style from './style.css';

const propTypes = {
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string,
};

class Fieldset extends Component {
  renderErrorMessage() {
    return this.props.errorMessage ?
      <div className={style.errorMessage}>
        <Icon name="alert-circle" className={style.icon} />
        {this.props.errorMessage}
      </div>
      : null;
  }

  render() {
    const { children, ...other } = this.props;
    return (
      <fieldset {...other} className={style.fieldset}>
        {children}
        {this.renderErrorMessage()}
      </fieldset>
    );
  }
}

Fieldset.propTypes = propTypes;

export default Fieldset;
