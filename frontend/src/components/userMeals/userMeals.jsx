import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir
import './UserMeals.css'; 

const UserMeals = () => {
  const [userMeals, setUserMeals] = useState([]);
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    const fetchUserMeals = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await fetch('http://localhost:3000/meals/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setUserMeals(data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchUserMeals();
  }, []);

  const handleMealClick = (mealId) => {
    navigate(`/meals/${mealId}`); // Navegar a la página de detalles de la comida
  };

  return (
    <div className="user-meals-container">
      {userMeals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <div className="meal-cards-container">
          {userMeals.map(meal => (
            <div key={meal.id} className="meal-card" onClick={() => handleMealClick(meal.id)}>
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
