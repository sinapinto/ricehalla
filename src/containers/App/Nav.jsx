import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from '../../components/Icon';
import Popover from '../../components/Popover';
import Button from '../../components/Button';
import Search from './Search';
import style from './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.state = {
      isPopoverOpen: false,
    };
  }

  openPopover() {
    this.setState({ isPopoverOpen: true });
  }

  closePopover() {
    this.setState({ isPopoverOpen: false });
  }

  renderLeftNav() {
    return (
      <span className={style.left}>
        <Link to="/" className={style.logo}>
          <Icon name="rice" size={34} className={style.bowl} />
        </Link>
        <Button
          to={{ pathname: '/', query: { q: this.props.query.q } }}
          outline
          className={this.props.query.sort !== 'createdAt' ? style.active : style.plain}
        >
          Popular
        </Button>
        <Button
          to={{ pathname: '/', query: { ...this.props.query, sort: 'createdAt' } }}
          outline
          className={this.props.query.sort === 'createdAt' ? style.active : style.plain}
        >
          New
        </Button>
      </span>
    );
  }

  renderRightNav() {
    if (this.props.loggedIn) {
      return (
        <span className={style.right}>
          <Search />
          <Button to="/submit" primary>
            <Icon name="plus" size={16} className={style.plusIcon} />
            Submit
          </Button>
          <Button onClick={this.openPopover} outline>
            {this.props.username}
            <Icon
              name="chevron-up"
              size={12}
              className={this.state.isPopoverOpen ? style.arrowUp : style.arrowDown}
            />
          </Button>
          <Popover onClose={this.closePopover} isOpen={this.state.isPopoverOpen}>
            <Link to={`/user/${this.props.username}`}>Profile</Link>
            <Button onClick={this.props.onLogout} outline className={style.plain}>Logout</Button>
          </Popover>
        </span>
      );
    }
    return (
      <span className={style.right}>
        <Search />
        <Button to="/login" outline className={style.plain}>Log&nbsp;In</Button>
        <Button to="/register">Register</Button>
      </span>
    );
  }

  render() {
    return (
      <div className={style.navWrapper}>
        <div className={style.nav}>
          {this.renderLeftNav()}
          {this.renderRightNav()}
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
  query: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

Nav.contextTypes = {
  router: PropTypes.object,
};

export default Nav;
