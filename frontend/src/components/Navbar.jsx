// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          <span className="logo-icon">🏢</span>
          <span className="logo-text">CareerNest</span>
        </Link>

        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'nav-links-active' : ''}`}>
          <Link 
            to="/" 
            className={isActiveLink('/')}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/jobs" 
            className={isActiveLink('/jobs')}
            onClick={closeMobileMenu}
          >
            Find Jobs
          </Link>
          <Link 
            to="/companies" 
            className={isActiveLink('/companies')}
            onClick={closeMobileMenu}
          >
            Companies
          </Link>
          <Link 
            to="/about" 
            className={isActiveLink('/about')}
            onClick={closeMobileMenu}
          >
            About
          </Link>
          
          {/* Show Profile link when user is logged in */}
          {user && (
            <div className='flex gap-5'>
              <Link 
              to="/profile" 
              className={isActiveLink('/profile')}
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
            <div className='mt-2'>
              <Link 
      
               to="/CreateJob" 
              className={isActiveLink('/CreateJob')}
              onClick={closeMobileMenu}
            >
              CreateJob 
            </Link>
            </div>
            </div>
            
          )}
        </div>

        {/* Auth Buttons */}
        <div className="nav-auth">
          {user ? (
            // Show when user is logged in
            <div className="user-menu">
              <span className="user-greeting">Hello, {user.name || user.email}</span>
              <button 
                onClick={handleLogout} 
                className="btn btn-logout"
              >
                Logout
              </button>
            </div>
          ) : (
            // Show when user is not logged in
            <div className="auth-buttons">
              <Link 
                to="/login" 
                className="btn btn-login"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn btn-signup"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
              
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;