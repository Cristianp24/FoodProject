import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importa correctamente jwtDecode
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para verificar rol de admin
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAuthenticated(true);
      setIsAdmin(decodedToken.role === 'admin'); // Verifica si el rol es 'admin'
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const token = window.location.hash.split('#')[1];
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id || decodedToken.sub;
      const userRole = decodedToken.role; // Obtén el rol del token

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userRole', userRole); // Almacena el rol
      setIsAdmin(userRole === 'admin'); // Establece el estado si es admin
      window.location.hash = '';
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
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole'); // Elimina el rol del almacenamiento
      setIsAuthenticated(false);
      setIsAdmin(false);
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
            {isAdmin && <a href="/dashboard" className="nav-link">Dashboard</a>} {/* Muestra solo si es admin */}
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
