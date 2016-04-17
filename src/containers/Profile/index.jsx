import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Card from '../../components/Card';
import { loadUser } from '../../actions/user';
import styles from './styles.css';

const propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string,
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
    const {
      uuid,
      username,
      email,
      about,
    } = this.props.user;

    return (
      <div className={styles.root}>
        <Helmet title={`${username} | ricehalla`} />
        <Card>
          <h2>{username}</h2>
          <ul className={styles.list}>
            <li><b>uuid:</b> {uuid}</li>
            <li><b>username:</b> {username}</li>
            <li><b>email:</b> {email}</li>
            <li><b>about:</b> {about}</li>
          </ul>
        </Card>
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
