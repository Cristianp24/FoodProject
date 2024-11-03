// FoodsTab.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodForm from './FoodForm';
import './FoodsTab.css';

const FoodsTab = () => {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const handleEditClick = (food) => {
    setEditingFood(food);
    setShowForm(true);
  };

  const handleDeleteClick = async (foodId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/foods/${foodId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFoods(foods.filter(food => food.id !== foodId));
    } catch (error) {
      console.error('Error deleting food:', error.message);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingFood(null);
  };

  return (
    <div className="foods-tab">
      <h2>Manage Foods</h2>
      <button onClick={() => setShowForm(true)}>Add Food</button>
      {showForm && (
        <FoodForm food={editingFood} onClose={handleFormClose} onFoodUpdated={setFoods} />
      )}
      <div className="foods-list">
        {foods.map(food => (
          <div key={food.id} className="food-item">
            <span>{food.name}</span>
            <button onClick={() => handleEditClick(food)}>Edit</button>
            <button onClick={() => handleDeleteClick(food.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodsTab;
