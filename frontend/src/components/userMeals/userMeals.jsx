import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import { AuthContext } from '../../context/AuthContext';
import './UserMeals.css';

const UserMeals = () => {
  const { userId } = useContext(AuthContext);
  const [userMeals, setUserMeals] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Instancia de useNavigate para redirección

  useEffect(() => {
    const fetchUserMeals = async () => {
      const token = localStorage.getItem('token');
      // No es necesario obtener userId de nuevo, ya que lo tenemos desde el contexto
      if (!userId || !token) {
        return "User is not autenticated";
      }

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

  const handleDeleteMeal = async (mealId) => {
    const confirmed = window.confirm("Are you sure you want to delete this meal?");
    if (!confirmed) return;

    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`http://localhost:3000/meals/${mealId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setUserMeals(userMeals.filter(meal => meal.id !== mealId));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete meal');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    }
  };

  const goToMealDetails = (mealId) => {
    navigate(`/meals/${mealId}`); // Redirige al componente de detalles de la comida
  };


  return (
    <div className="user-meals-view">
     
      {error && <p className="error">{error}</p>}
      {userMeals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <div className="meal-cards-container">
          {userMeals.map(meal => (
            <div
              key={meal.id}
              className="meal-card"
              onClick={() => goToMealDetails(meal.id)} // Maneja el click para redirigir
              style={{ cursor: 'pointer' }} // Cambia el cursor para indicar interactividad
            >
              <h3>{meal.name}</h3>
              <p><strong>Date:</strong> {new Date(meal.createdAt).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(meal.createdAt).toLocaleTimeString()}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Previene la redirección en caso de eliminar
                  handleDeleteMeal(meal.id);
                }}
                className="delete-button"
              >
                Delete Meal
              </button>
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
};

export default UserMeals;
