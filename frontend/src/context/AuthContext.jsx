// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const id = localStorage.getItem('userId');
    if (token && id) {
      setIsAuthenticated(true);
      setUserId(id);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId }}>
      {children}
    </AuthContext.Provider>
  );
};