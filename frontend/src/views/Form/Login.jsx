import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode }  from 'jwt-decode'; // Asegúrate de importar correctamente jwt-decode

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
        const data = await response.json();
        console.log("Login response data:", data);

        if (data.token) {
          try {
            // Decodificar el token y verificar el ID de usuario
            const decodedToken = jwtDecode(data.token);
            console.log('Decoded token:', decodedToken);

            // Obtener el ID de usuario (usar `id` para local y `sub` para Google)
            const userId = decodedToken.id || decodedToken.sub;
            if (!userId) {
              throw new Error('User ID not found in token');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', userId);

            navigate('/home');
          } catch (decodeError) {
            console.error('Token decode error:', decodeError);
            setError('Invalid token received');
          }
        } else {
          setError('Login failed: no token received');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    }
  };

  // Manejar inicio de sesión con Google
  const handleGoogleLogin = () => {
    // Redirige al endpoint de Google del backend
    window.location.href = 'http://localhost:3000/users/auth/google';
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

      <p>Forgot password? <a href="/request-password-reset">Reset Password</a></p>

      <button
        onClick={handleGoogleLogin}
        style={{
          backgroundColor: '#4285F4',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        Login with Google
      </button>

      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
