import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import jwtDecode from 'jwt-decode';
import { logout } from '../../actions/auth';
import Popover from '../../components/Popover';
import Button from '../../components/Button';
import NavLink from '../../components/NavLink';
import styles from './styles.css';

const propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object,
  username: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const contextTypes = {
  router: PropTypes.object
};

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleLogout = this.handleLogout.bind(this);
    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      // login
      this.context.router.push('/');
    } else if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
      // logout
      this.context.router.push('/');
    }
  }

  getMeta() {
    return [
      { name: 'description', content: 'sharing dotfiles' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'utf-8' },
      { property: 'og:site_name', content: 'ricehalla' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:title', content: 'ricehalla' },
      { property: 'og:description', content: 'sharing dotfiles' },
    ];
  }

  openPopover() {
    this.setState((prev) => {
      if (!prev.isOpen) {
        return { isOpen: true };
      }
    });
  }

  closePopover() {
    this.setState({ isOpen: false });
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  noNav() {
    const { route, location } = this.props;
    return !!~route.noNav.indexOf(location.pathname);
  }

  loggedInNav() {
    return (
      <div className={styles.nav}>
        <div className={styles.navWrapper}>
          <Link to="/" className={styles.navLogo}>ricehalla</Link>
          <NavLink to="/submit">Submit</NavLink>
          <Button onClick={this.openPopover} outline>
            {this.props.username}
          </Button>
          <Popover onClose={this.closePopover} isOpen={this.state.isOpen}>
            <Link to={`/user/${this.props.username}`}>Profile</Link>
            <Link to="#" onClick={this.handleLogout}>Logout</Link>
          </Popover>
        </div>
      </div>
    );
  }

  loggedOutNav() {
    return (
      <div className={styles.nav}>
        <div className={styles.navWrapper}>
          <Link to="/" className={styles.navLogo}>ricehalla</Link>
          <NavLink to="/register" outline>Register</NavLink>
          <NavLink to="/login" primary outline>Log In</NavLink>
        </div>
      </div>
    );
  }

  renderNav() {
    if (this.noNav()) {
      return null;
    }
    if (this.props.isAuthenticated) {
      return this.loggedInNav();
    }
    return this.loggedOutNav();
  }

  render() {
    return (
      <div className={styles.root}>
        <Helmet title="ricehalla" meta={this.getMeta()} />
        {this.renderNav()}
        <div className={styles.childWrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.contextTypes = contextTypes;

function mapStateToProps(state) {
  const { auth: { isAuthenticated, token } } = state;
  const username = (token && isAuthenticated) ? jwtDecode(token).username : null;
  return {
    isAuthenticated,
    username,
  };
}

export default connect(mapStateToProps, { logout })(App);
