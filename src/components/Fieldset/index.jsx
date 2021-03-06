import React, { Component, PropTypes } from 'react';
import Icon from '../Icon';
import style from './style.css';

class Fieldset extends Component {
  render() {
    const { children, ...other } = this.props;
    return (
      <fieldset {...other} className={style.fieldset}>
        {children}
        {this.props.errorMessage ?
          <div className={style.error}>
            <Icon name="alert-circle" className={style.icon} />
            <div>{this.props.errorMessage}</div>
          </div>
        : null}
      </fieldset>
    );
  }
}

Fieldset.propTypes = {
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string,
};

export default Fieldset;
