// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import { Link } from 'react-router-dom';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        <header className="navbar">
          <Link to="/">
            <h1>JSDoc</h1>
          </Link>
        </header>
        {this.props.children}
      </div>
    );
  }
}
