import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">CareKeeper</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/PatientTestPage" className="nav-link">Scott's PatientTestPage</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create_patient" className="nav-link">Derek's Create Patient</Link>
          </li>
          <li className="navbar-item">
          <Link to="/edit_patient" className="nav-link">Derek's Edit Patient</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create_ADL" className="nav-link">Derek's CreateADLTestPage</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}