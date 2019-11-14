import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg"
            style={{"backgroundColor": "#FF7F50"}}>
        <Link to="/" className="navbar-brand">CareKeeper</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        </ul>
        </div>
      </nav>
    );
  }
}