  // UserMealsView.jsx
  import React, { useEffect, useState, useContext } from 'react';
  import { AuthContext } from '../../context/AuthContext';
  import './UserMeals.css'; // Asegúrate de agregar estilos según sea necesario

  const UserMeals = () => {
    const { userId } = useContext(AuthContext); // Obtener el ID del usuario del contexto
    const [userMeals, setUserMeals] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUserMeals = async () => {
        const token = localStorage.getItem('authToken');  // Obtén el token del localStorage
        if (!userId || !token) return;

  
        try {
          const response = await fetch(`http://localhost:3000/meals/users/${userId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          
          if (response.ok) {
            setUserMeals(data);
          } else {
            setError(data.message || 'Failed to fetch meals');
          }
        } catch (error) {
          setError('An unexpected error occurred');
        }
      };
  
      fetchUserMeals();
    }, [userId]);
  
    return (
      <div className="user-meals-view">
        {error && <p className="error">{error}</p>}
        {userMeals.length === 0 ? (
          <p>No meals found.</p>
        ) : (
          <div className="meal-cards-container">
            {userMeals.map(meal => (
              <div key={meal.id} className="meal-card">
                <h3>{meal.name}</h3>
                <p><strong>Date:</strong> {new Date(meal.createdAt).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(meal.createdAt).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  

  export default UserMeals;
