import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import jwtDecode from 'jwt-decode';
import Popover from '../../components/Popover';
import Button from '../../components/Button';
import NavLink from '../../components/NavLink';
import style from './style.css';

const propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object,
  username: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};

const contextTypes = {
  router: PropTypes.object
};

class App extends Component {
  constructor(props, context) {
    super(props, context);
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
      // this.context.router.push('/');
    }
  }

  getMeta() {
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

  noNav() {
    const { route, location } = this.props;
    return ~route.noNav.indexOf(location.pathname);
  }

  loggedInNav() {
    return (
      <div className={style.nav}>
        <div className={style.navWrapper}>
          <Link to="/" className={style.logo}>ricehalla</Link>
          <NavLink to="/submit" success>Submit</NavLink>
          <Button onClick={this.openPopover} outline>
            {this.props.username}
          </Button>
          <Popover onClose={this.closePopover} isOpen={this.state.isOpen}>
            <Link to={`/user/${this.props.username}`}>Profile</Link>
            <Link to="/logout">Logout</Link>
          </Popover>
        </div>
      </div>
    );
  }

  loggedOutNav() {
    return (
      <div className={style.nav}>
        <div className={style.navWrapper}>
          <Link to="/" className={style.logo}>ricehalla</Link>
          <NavLink to="/register" outline style={{ border: 0 }}>Register</NavLink>
          <NavLink to="/login" outline>Log In</NavLink>
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
      <div className={style.root}>
        <Helmet title="Ricehalla" meta={this.getMeta()} />
        {this.renderNav()}
        <div className={style.childWrapper}>
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

export default connect(mapStateToProps)(App);
