import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { load as loadRice } from '../../actions/rice';
import style from './style.css';

const propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  loadRice: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

class Rice extends Component {
  // static prefetchData({ dispatch, params }) {
  //   return dispatch(loadRice(params.id));
  // }

  render() {
    const { params, title, description } = this.props;
    return (
      <div className={style.root}>
        <Helmet title={`${title} | ricehalla`} />
        <h2>{title}</h2>
        <span>{params.id}</span>
        <p>{description}</p>
      </div>
    );
  }
}

Rice.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    ...state.rice,
  };
}

export default connect(mapStateToProps, { loadRice })(Rice);
