  // UserMealsView.jsx
  import React, { useEffect, useState, useContext } from 'react';
  import { AuthContext } from '../../context/AuthContext';
  import './UserMeals.css'; // Asegúrate de agregar estilos según sea necesario

  const UserMeals = () => {
    const { user } = useContext(AuthContext); // Obtener el usuario del contexto
    const [userMeals, setUserMeals] = useState([]);
    const [error, setError] = useState(null); // Para manejar errores

    
    useEffect(() => {
      const fetchUserMeals = async () => {
        if (!user || !user.token) return;
    
        try {
          const response = await fetch(`http://localhost:3000/meals/users/${user.id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const meals = await response.json();
            setUserMeals(meals);
          } else {
            setError('Failed to fetch meals');
          }
        } catch (error) {
          console.error('Error fetching meals:', error);
          setError('Error fetching meals');
        }
      };
    
      fetchUserMeals();
    }, [user]);



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
