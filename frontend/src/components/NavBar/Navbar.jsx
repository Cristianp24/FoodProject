import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Asegúrate de crear este archivo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Cambiado useHistory por useNavigate

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    setIsAuthenticated(false); // Actualiza el estado para reflejar que ya no está autenticado
    navigate('/login'); // Redirige al login
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">Landing</a>
      </div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <a href="/home" className="nav-link">Home</a>
        <a href="/create-meal" className="nav-link">Calculate Meal</a>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="nav-link logout-button">
            Logout
          </button>
        ) : (
          <a href="/login" className="nav-link">Login</a>
        )}
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
