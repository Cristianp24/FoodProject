import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MealDetails = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null); // Inicializamos con null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/meals/${mealId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de usar el token correcto
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching meal details');
        }

        const data = await response.json();
        setMeal(data);
      } catch (error) {
        console.error('Error fetching meal details:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [mealId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Si `meal` es null o undefined, se espera hasta que se cargue
  if (!meal) {
    return <div>No meal details found</div>;
  }

  return (
    <div>
      <h1>{meal.name}</h1>
      <p>Proteína: {meal.totalProtein}g</p>
      <p>Carbohidratos: {meal.totalCarbohydrates}g</p>
      <p>Grasas: {meal.totalFat}g</p>
      <p>Calorías: {meal.totalCalories} kcal</p>
    </div>
  );
};

export default MealDetails;
