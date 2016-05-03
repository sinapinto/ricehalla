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
    User: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    Tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      }).isRequired
    ),
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    files: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  showRice: PropTypes.func.isRequired,
};

class RiceDetail extends Component {
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

RiceDetail.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    detail: state.rice.detail,
  };
}

export default connect(mapStateToProps, { showRice })(RiceDetail);
