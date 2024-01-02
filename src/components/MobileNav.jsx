// MobileNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlay } from '@fortawesome/free-solid-svg-icons';
import '../styles/MobileNav.css'; 

const MobileNav = () => {
  return (
    <div className="mobile-nav">
      <Link to="/" className="mobile-nav-item">
        <FontAwesomeIcon icon={faHouse} className="nav-icon home-icon" />
        <span className="nav-text home-text">Home</span>
      </Link>
      <Link to="/" className="mobile-nav-item">
        <FontAwesomeIcon icon={faPlay} className="nav-icon new-hot-icon" />
        <span className="nav-text new-hot-text">New & Hot</span>
      </Link>
      <Link to="/" className="mobile-nav-item">
        <img src="/avatar-1.png" alt="My Netflix" className="nav-icon my-netflix-icon" />
        <span className="nav-text my-netflix-text">My Netflix</span>
      </Link>
    </div>
  );
};

export default MobileNav;

