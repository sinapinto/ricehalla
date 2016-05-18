import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import jwtDecode from 'jwt-decode';
import Icon from '../../components/Icon';
import Popover from '../../components/Popover';
import Button from '../../components/Button';
import NavLink from '../../components/NavLink';
import style from './style.css';

const propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object,
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
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
      isPopoverOpen: false,
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
      if (!prev.isPopoverOpen) {
        return { isPopoverOpen: true };
      }
    });
  }

  closePopover() {
    this.setState({ isPopoverOpen: false });
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
          <NavLink to="/submit" primary outline>Submit</NavLink>
          <Button onClick={this.openPopover} outline style={{ marginRight: '.8em' }}>
            {this.props.username}
            <Icon
              name={this.state.isPopoverOpen ? 'chevron-up' : 'chevron-down'}
              size={12}
              className={style.arrowIcon}
            />
          </Button>
          <Popover onClose={this.closePopover} isOpen={this.state.isPopoverOpen}>
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
    const { username, userId } = this.props;
    return (
      <div className={style.root}>
        <Helmet title="Ricehalla" meta={this.getMeta()} />
        {this.renderNav()}
        <div className={style.childWrapper}>
          {/* assumes single child */}
          {React.cloneElement(this.props.children, { username, userId })}
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.contextTypes = contextTypes;

function mapStateToProps(state) {
  const { auth: { isAuthenticated, token } } = state;
  const decoded = (token && isAuthenticated) ? jwtDecode(token) : {};
  return {
    isAuthenticated,
    userId: decoded.id && +decoded.id,
    username: decoded.username,
  };
}

export default connect(mapStateToProps)(App);
