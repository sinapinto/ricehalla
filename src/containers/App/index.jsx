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
    // login
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      this.context.router.push('/');
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
    this.setState({ isPopoverOpen: true });
  }

  closePopover() {
    this.setState({ isPopoverOpen: false });
  }

  noNav() {
    const { route, location } = this.props;
    return route.noNav.includes(location.pathname);
  }

  loggedInNav() {
    return (
      <div className={style.nav}>
        <div className={style.navWrapper}>
          <Link to="/" className={style.logo}>
            <Icon name="rice" size={40} className={style.bowl} />
          </Link>
          <NavLink to="/submit" primary>
            <Icon name="plus" size={16} className={style.plusIcon} />
            Submit
          </NavLink>
          <Button onClick={this.openPopover} outline style={{ marginRight: '.8em' }}>
            {this.props.username}
            <Icon
              name="chevron-up"
              size={12}
              className={this.state.isPopoverOpen ? style.arrowUp : style.arrowDown}
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
          <Link to="/" className={style.logo}>
            <Icon name="rice" size={40} className={style.bowl} />
          </Link>
          <NavLink to="/login" outline style={{ border: 0 }}>Log&nbsp;In</NavLink>
          <NavLink to="/register" outline>Register</NavLink>
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

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  route: PropTypes.object,
  userId: PropTypes.number,
  username: PropTypes.string,
  isAuthenticated: PropTypes.bool,
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
  };
}

export default connect(mapStateToProps)(App);
