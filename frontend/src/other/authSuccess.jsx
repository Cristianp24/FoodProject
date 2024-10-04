import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el token de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      // Guardar el token en localStorage
      localStorage.setItem('token', token);

      // Redirigir al usuario a la página de inicio u otra página
      navigate('/home');
    } else {
      console.error('Token not found');
      navigate('/login'); // Redirigir al login si no hay token
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default AuthSuccess;
