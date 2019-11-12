import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">CareKeeper</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          
        </ul>
        </div>
      </nav>
      </div>
    )
}

export default Header;
