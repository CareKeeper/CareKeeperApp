import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand">
        {/*<Link to="/" className="navbar-brand">NavBar Test</Link>*/}
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto text-right">
            <li className="navbar-item">
              <Link to="/Demo1Home" className="nav-link">Demo1</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto text-right">
            <li className="navbar-item">
              <Link to="/CareManagerOfficial" className="nav-link">Manager Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/CaregiverOfficial" className="nav-link">Caregiver Home</Link>
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