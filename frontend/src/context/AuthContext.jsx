// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const id = localStorage.getItem('userId');
    const role = localStorage.getItem('userRole');

    if (token && id && role) {
      setIsAuthenticated(true);
      setUserId(id);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserId(null);
      setUserRole(null);
    }

    setLoading(false); // Termina la carga cuando termina la verificación
  }, []);

  const isAdmin = () => userRole === 'admin';

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, userRole, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
