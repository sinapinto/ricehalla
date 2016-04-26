import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { loadUser } from '../../actions/user';
import style from './style.css';

const propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    about: PropTypes.string,
  }).isRequired,
  params: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
  loadUser: PropTypes.func.isRequired,
};

class Profile extends Component {
  static prefetchData({ dispatch, params }) {
    return dispatch(loadUser(params.username));
  }

  componentWillMount() {
    if (!this.props.user.username) {
      this.props.loadUser(this.props.params.username);
    }
  }

  render() {
    const { username, email, about } = this.props.user;
    return (
      <div className={style.root}>
        <Helmet title={`${username} | ricehalla`} />
        <h2>{username}</h2>
        <ul className={style.list}>
          <li><b>username:</b> {username}</li>
          <li><b>email:</b> {email}</li>
          <li><b>about:</b> {about}</li>
        </ul>
      </div>
    );
  }
}

Profile.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { loadUser })(Profile);
