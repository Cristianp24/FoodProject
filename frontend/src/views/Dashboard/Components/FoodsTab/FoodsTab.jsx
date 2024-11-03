import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FoodsTab.css';

const FoodsTab = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  // Función para obtener los alimentos
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/foods');
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error.message);
      }
    };
    fetchFoods();
  }, []);

  // Función para eliminar un alimento
  const deleteFood = async (foodId) => {
    try {
      await axios.delete(`http://localhost:3000/foods/${foodId}`);
      setFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodId));
    } catch (error) {
      console.error('Error deleting food:', error.message);
    }
  };

  return (
    <div className="foods-tab">
      <h2>Manage Foods</h2>
      <button onClick={() => navigate('/create-food')} className="add-food-button">
        Add Food
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Protein</th>
            <th>Carbohydrates</th>
            <th>Fat</th>
            <th>Fiber</th>
            <th>Calories</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>{food.name}</td>
              <td>{food.protein}</td>
              <td>{food.carbohydrates}</td>
              <td>{food.fat}</td>
              <td>{food.fiber}</td>
              <td>{food.calories}</td>
              <td>{food.quanty}</td>
              <td>{food.unit}</td>
              <td>
                
                <button onClick={() => deleteFood(food.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodsTab;
