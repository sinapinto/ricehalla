import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import style from './style.css';

class Tag extends Component {
  render() {
    if (this.props.to) {
      return (
        <Link
          to={this.props.to}
          className={style.tag}
        >
          {this.props.children}
        </Link>
      );
    }
    return <div className={style.tag}>{this.props.children}</div>;
  }
}

Tag.propTypes = {
  to: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Tag;
