import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import isAuthenticated from '../components/AuthHelper';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = location.pathname;

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page after logout
    navigate('/signin');
    window.location.reload(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${activePage === '/' ? 'active' : ''}`}>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className={`nav-item ${activePage === '/about' ? 'active' : ''}`}>
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          {isAuthenticated() ? (
            <form className="d-flex">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </form>
          ) : (
            <div>
              <Link to="/signin" className="btn btn-outline-light mx-2">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-outline-light">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
