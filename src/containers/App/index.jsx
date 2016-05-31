import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import jwtDecode from 'jwt-decode';
import cookie from '../../utils/cookie';
import { logout } from '../../actions/auth';
import { setNotice, clearNotice } from '../../actions/notice';
import Nav from './Nav';
import Notice from '../../components/Notice';
import style from './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleCloseNotice = this.handleCloseNotice.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      this.context.router.push('/');
    }
    if (this.props.location.pathname !== nextProps.location.pathname && this.props.notice.message) {
      this.props.clearNotice();
    }
  }

  handleLogout() {
    cookie.removeAll();
    this.props.logout();
    this.context.router.push('/');
    this.props.setNotice('info', 'You have logged out successfully.');
  }

  handleCloseNotice() {
    this.props.clearNotice();
  }

  getMetaTags() {
    return [
      { name: 'description', content: 'sharing dotfiles' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'utf-8' },
      { property: 'og:site_name', content: 'Ricehalla' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:title', content: 'Ricehalla' },
      { property: 'og:description', content: 'sharing dotfiles' },
    ];
  }

  renderNav() {
    const { route, location } = this.props;
    if (route.noNav.includes(location.pathname)) {
      return null;
    }
    return (
      <Nav
        username={this.props.username}
        loggedIn={!!this.props.isAuthenticated}
        query={this.props.location.query}
        pathname={this.props.location.pathname}
        onLogout={this.handleLogout}
      />
    );
  }

  render() {
    const { username, userId, notice, setNotice } = this.props;
    return (
      <div className={style.root}>
        <Helmet title="Ricehalla" meta={this.getMetaTags()} />
        {this.renderNav()}
        <div className={style.childWrapper}>
          {notice.message &&
            <Notice level={notice.level} message={notice.message} onClose={this.handleCloseNotice} />}
          {/* assumes single child */}
          {React.cloneElement(this.props.children, { username, userId })}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object,
  userId: PropTypes.number,
  username: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  notice: PropTypes.shape({
    level: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  clearNotice: PropTypes.func.isRequired,
  setNotice: PropTypes.func.isRequired,
};

App.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  const { auth: { isAuthenticated, token } } = state;
  const decoded = (token && isAuthenticated) ? jwtDecode(token) : {};
  return {
    isAuthenticated,
    userId: decoded.id && +decoded.id,
    username: decoded.username,
    notice: state.notice,
  };
}

export default connect(mapStateToProps, {
  logout,
  setNotice,
  clearNotice,
})(App);
