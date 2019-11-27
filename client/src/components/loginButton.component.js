import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Home from '../views/Home/Home';

export default class Navbar2 extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        {/*<Link to="/" className="navbar-brand">NavBar Test</Link>*/}
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav ml-auto text-right">
            <li className="navbar-item nav-link">
              Okta <Home />
            </li>
            <li className="navbar-item">
                <Link to="/user" className="nav-link">user</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

/*
Format/Template

          <li className="navbar-item nav-link" style={{color: 'red'}}>
            <b>x</b>
          </li>

<li className="navbar-item">
  <Link to="/create_ADL" className="nav-link">Create Custom ADL</Link>
</li>

*/