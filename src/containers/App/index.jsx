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
    this.state = { showNotice: true };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      this.context.router.push('/');
    }
    if (this.props.location.pathname !== nextProps.location.pathname && this.props.notice.message) {
      this.props.clearNotice();
      this.setState({ showNotice: false });
    } else if (!this.props.notice.message && nextProps.notice.message) {
      this.setState({ showNotice: true });
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
      { name: "apple-mobile-web-app-title", content: "Ricehalla" },
      { name: "application-name", content: "Ricehalla" },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "msapplication-TileImage", content: "/mstile-144x144.png" },
      { name: "theme-color", content: "#ffffff" },
      { charset: 'utf-8' },
      { property: 'og:site_name', content: 'Ricehalla' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:title', content: 'Ricehalla' },
      { property: 'og:description', content: 'sharing dotfiles' },
    ];
  }

  getLinkTags() {
    return [
      { rel: "apple-touch-icon", sizes: "57x57", href: "/apple-touch-icon-57x57.png" },
      { rel: "apple-touch-icon", sizes: "60x60", href: "/apple-touch-icon-60x60.png" },
      { rel: "apple-touch-icon", sizes: "72x72", href: "/apple-touch-icon-72x72.png" },
      { rel: "apple-touch-icon", sizes: "76x76", href: "/apple-touch-icon-76x76.png" },
      { rel: "apple-touch-icon", sizes: "114x114", href: "/apple-touch-icon-114x114.png" },
      { rel: "apple-touch-icon", sizes: "120x120", href: "/apple-touch-icon-120x120.png" },
      { rel: "apple-touch-icon", sizes: "144x144", href: "/apple-touch-icon-144x144.png" },
      { rel: "apple-touch-icon", sizes: "152x152", href: "/apple-touch-icon-152x152.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon-180x180.png" },
      { rel: "icon", type: "image/png", href: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
      { rel: "icon", type: "image/png", href: "/favicon-16x16.png", sizes: "16x16" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
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
        <Helmet title="Ricehalla" meta={this.getMetaTags()} link={this.getLinkTags()} />
        {this.renderNav()}
        <div className={style.childWrapper}>
          {this.state.showNotice && <Notice
            level={notice.level}
            message={notice.message}
            onClose={this.handleCloseNotice}
          />}
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
