import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Log In</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/create_ADL" className="nav-link">Create Custom ADL</Link>
          </li>
          <li className="navbar-item nav-link" style={{color: 'red'}}>
            <b>This NavBar For Testing Only</b>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}