import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();


  
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const token = window.location.hash.split('#')[1];
    if (token) {
      const decodedToken = jwtDecode(token); // Decodificar el token
      const userId = decodedToken.id || decodedToken.sub; // Asignar userId
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId); // Almacenar el userId
      window.location.hash = ''; // Eliminar el token de la URL
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [localStorage.getItem('token')]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // Eliminar el token del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      // Actualizar el estado de autenticación
      setIsAuthenticated(false);

      // Redirigir al usuario a la página de login
      navigate('/login');
    } catch (error) {
      console.error('Error al realizar logout:', error);
    }
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
          <>
             <a href="/meals/users" className="nav-link">Mis comidas</a>
            <button onClick={handleLogout} className="nav-link logout-button">
              Logout
            </button>
          </>
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