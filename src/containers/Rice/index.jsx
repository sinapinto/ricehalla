import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { show as showRice } from '../../actions/rice';
import style from './style.css';

const propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  detail: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  showRice: PropTypes.func.isRequired,
};

class Rice extends Component {
  componentDidMount() {
    // populate this.props.detail
    if (this.props.params.id) {
      this.props.showRice(this.props.params.id);
    }
  }

  render() {
    const { title = '', description, id } = this.props.detail;
    return (
      <div className={style.root}>
        <Helmet title={`${title} | Ricehalla`} />
        <div>{description}</div>
        <div>{id}</div>
      </div>
    );
  }
}

Rice.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    detail: state.rice.detail,
  };
}

export default connect(mapStateToProps, { showRice })(Rice);
