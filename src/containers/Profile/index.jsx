import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { loadUser } from '../../actions/user';
import style from './style.css';

const propTypes = {
  user: PropTypes.shape({
    Rice: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ).isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    error: PropTypes.object,
  }).isRequired,
  params: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  loadUser: PropTypes.func.isRequired,
};

class Profile extends Component {
  componentDidMount() {
    this.props.loadUser(this.props.params.username || this.props.user.username);
  }

  render() {
    const { username, about } = this.props.user;
    return (
      <div className={style.root}>
        <Helmet title={`${username} | Ricehalla`} />
        <div className={style.userInfo}>
          <h2>{username}</h2>
          <ul className={style.list}>
            <li>{username}</li>
            <li>{about}</li>
          </ul>
        </div>
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
