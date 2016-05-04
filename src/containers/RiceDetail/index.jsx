import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import { show as showRice } from '../../actions/rice';
import style from './style.css';

const propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  detail: PropTypes.shape({
    User: PropTypes.shape({
      username: PropTypes.string.isRequired,
      emailHash: PropTypes.string.isRequired,
    }),
    Tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
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
  }),
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
    const { User, Tags, title, description, likes, userId, id } = this.props.detail;
    const files = typeof this.props.detail.files !== 'undefined'
      ? JSON.parse(this.props.detail.files)
      : [];
    const createdAt = moment(this.props.detail.createdAt).from();
    const updatedAt = moment(this.props.detail.updatedAt).from();
    return (
      <div className={style.root}>
        <Helmet title={`${title} | Ricehalla`} />
        <p>{title}</p>
        <p>{description}</p>
        {User ? <p>{User.username}</p> : null}
        <p>{likes} likes</p>
        <p>created {createdAt}</p>
        <p>updated {updatedAt}</p>
        {files ? files.map((file, i) =>
          <div key={i}>
            <p>{file}</p>
          </div>)
        : null}
        {Tags ? Tags.map((tag, i) =>
          <div key={i}>
            <p>{tag.name}</p>
          </div>)
        : null}
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
