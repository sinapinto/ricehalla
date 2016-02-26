import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import jwtDecode from 'jwt-decode';
import { loadUser } from '../../actions/user';

const propTypes = {
  username: PropTypes.string,
  loadUser: PropTypes.func.isRequired,
};

class Dashboard extends Component {
  static loadAsyncData(dispatch) {
    return dispatch(loadUser());
  }

  render() {
    const { username } = this.props;
    return (
      <div>
        <Helmet title="Dashboard" />
        <h1>dashboard for {username}</h1>
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

function mapStateToProps(state) {
  const username = state.auth.isAuthenticated ? jwtDecode(state.auth.token).username : null;
  return {
    username,
  };
}

export default connect(mapStateToProps, { loadUser })(Dashboard);
