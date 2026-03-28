import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-trophy-fill me-2"></i>
          Cricket Team Manager
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Player List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-primary border-0 btn-sm text-white px-3 ms-lg-3" to="/add-player">
                Add Player
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
