import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Icon from '../../components/Icon';
import style from './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
    this.state = {
      isFocused: false,
      value: '',
    };
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeypress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeypress);
  }

  handleKeypress(e) {
    if (e.which === 47 && !this.state.isFocused) { // forward slash
      e.preventDefault();
      this.setState({ isFocused: true });
    }
  }

  handleClick() {
    this.setState({ isFocused: true });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyDown(e) {
    if (e.keyCode === 27) { // escape
      e.preventDefault();
      this.setState({ isFocused: false });
    } else if (e.keyCode === 13) { // enter
      e.preventDefault();
      this.setState({ isFocused: false, value: '' });
      const query = this.state.value ? `/?q=${this.state.value}` : '/';
      this.context.router.push(query);
    }
  }

  closeOverlay() {
    this.setState({ isFocused: false });
  }

  render() {
    return (
      <span className={style.wrapper}>
        <Icon
          name="search"
          size={26}
          className={style.icon}
          onClick={this.handleClick}
        />
        {this.state.isFocused ?
          <div className={style.overlay}>
            <textarea
              autoFocus
              spellCheck={false}
              maxLength={30}
              className={style.input}
              placeholder="search"
              value={this.state.value}
              onClick={this.closeOverlay}
              onBlur={this.closeOverlay}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          : null}
      </span>
    );
  }
}

Search.contextTypes = {
  router: PropTypes.object,
};

export default Search;
