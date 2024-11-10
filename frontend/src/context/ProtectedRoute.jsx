import React, { useContext, useRef  } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useContext(AuthContext);
  const alertShown = useRef(false) // Nueva bandera para controlar la alerta

  if (loading) {
    return null; // O algún indicador de carga
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin()) {
    // Si la alerta ya fue mostrada, evita que se muestre de nuevo
    if (!alertShown.current) {
      alert("Acceso denegado. Solo los administradores pueden acceder a esta ruta.");
      alertShown.current = true; // Establece la bandera para que no vuelva a mostrar la alerta
    }
    return <Navigate to="/home" />; // Redirige al usuario al Home
  }

  return children;
};

export default ProtectedRoute;
