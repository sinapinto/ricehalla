import React, { Component, PropTypes } from 'react';
import style from './style.css';

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      isActive: false,
      shown: false,
    };
  }

  show(e) {
    this.setState({
      isActive: true,
      shown: true,
    });
  }

  hide(e) {
    this.setState({ isActive: false });
  }

  render() {
    return (
      <div className={style.tooltipWrap}>
        <div onMouseEnter={this.show} onMouseLeave={this.hide} className={style.childWrap}>
          {this.props.children}
        </div>
        {this.state.shown && <div className={this.state.isActive ? style.tooltip : style.hidden}>
          {this.props.message}
        </div>}
      </div>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node,
  message: PropTypes.node.isRequired,
};

export default Tooltip;
