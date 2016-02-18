import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/user';
import Helmet from 'react-helmet';

const propTypes = {
  data: PropTypes.string,
  loadUser: PropTypes.func.isRequired,
};

class Dashboard extends Component {
  static loadAsyncData(dispatch) {
    return dispatch(loadUser());
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <Helmet title="Dashboard" />
        <h1>dashboard</h1>
        {data && data}
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

export default connect(mapStateToProps, { loadUser })(Dashboard);
