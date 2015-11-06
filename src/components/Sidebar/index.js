import React, { Component } from 'react';
import { Link } from 'react-router';

export class Sidebar extends Component {
  render() {
    return (
      <div>
        side bar
        <Link to="/home" activeClassName="active">Home</Link>
      </div>
    );
  }
}
