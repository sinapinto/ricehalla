import React, { Component } from 'react';
import { Link } from 'react-router';

export class Home extends Component {
  render() {
    return (
      <div>
        home
        <li>
          <Link to="/contest/1">contest one</Link>
        </li>
        <li>
          <Link to="/contest/2">contest two</Link>
        </li>
        <li>
          <Link to="/contest/3">contest three</Link>
        </li>
      </div>
    );
  }
}
