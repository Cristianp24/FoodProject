import React, { useState } from 'react';
import './Navbar.css'; // Asegúrate de crear este archivo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">Landing</a>
      </div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <a href="/home" className="nav-link">Home</a>
        <a href="/create-meal" className="nav-link">Calculate Meal</a>
        <a href="/login" className="nav-link">Login</a>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
        <span className="hamburger"></span>
      </div>
    </nav>
  );
};

export default Navbar;
