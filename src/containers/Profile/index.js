import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

const propTypes = {
  routeParams: PropTypes.object.isRequired,
};

class Profile extends Component {
  render() {
    const { routeParams } = this.props;

    return (
      <div>
        <Helmet title="sdf" />
        user: {routeParams.id}
      </div>
    );
  }
}

Profile.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Profile);
