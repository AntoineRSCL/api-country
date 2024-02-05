// Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setIsOpen(false); // Fermer le menu après la navigation
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div className="navbar-brand">
        <button className="navbar-toggle" onClick={toggleNavbar}>
          ☰
        </button>
      </div>
      <ul className={`navbar-links ${isOpen ? 'hidden' : ''}`}>
        <li><Link to="/" onClick={() => handleLinkClick('/')}>Home</Link></li>
        <li><Link to="/country" onClick={() => handleLinkClick('/country')}>Country</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
