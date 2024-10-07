import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Manejar inicio de sesión local
  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json(); // Obtener la respuesta en JSON
        console.log("Login response data:", data); // Verificar la respuesta del servidor
  
        if (data.token) {
          // Decodificar el token para obtener el userId
          const decodedToken = jwtDecode(data.token);
          console.log('Decoded token:', decodedToken); // Verificar qué campos tiene el token
  
          // Intentar obtener el userId del campo 'id' o del campo 'sub' (para Google)
          const userId = decodedToken.id || decodedToken.sub; 
          if (!userId) {
            throw new Error('User ID not found in token');
          }
          
          localStorage.setItem('token', data.token); // Guardar el token JWT
          localStorage.setItem('userId', userId); // Guardar el ID de usuario en el localStorage
  
          navigate('/home'); // Redirigir al usuario a la página de inicio
        } else {
          setError('Login failed: no token received');
        }
      } else {
        const errorData = await response.json(); // Capturar mensaje de error
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    }
  };

  // Manejar inicio de sesión con Google (redirige al backend)
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/users/auth/google/callback';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>

      <p>or</p>

      {/* Botón de inicio de sesión con Google */}
      <button onClick={handleGoogleLogin} style={{ backgroundColor: '#4285F4', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Login with Google
      </button>

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
