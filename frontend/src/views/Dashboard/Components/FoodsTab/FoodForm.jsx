// FoodForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodForm.css';

const FoodForm = ({ food, onClose, onFoodUpdated }) => {
  const [name, setName] = useState('');
  const [nutritionalValue, setNutritionalValue] = useState('');

  useEffect(() => {
    if (food) {
      setName(food.name);
      setNutritionalValue(food.nutritionalValue);
    }
  }, [food]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (food) {
        // Edit existing food
        await axios.put(`http://localhost:3000/foods/${food.id}`, { name, nutritionalValue }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onFoodUpdated(prevFoods => prevFoods.map(f => f.id === food.id ? { ...f, name, nutritionalValue } : f));
      } else {
        // Create new food
        const response = await axios.post('http://localhost:3000/foods', { name, nutritionalValue }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onFoodUpdated(prevFoods => [...prevFoods, response.data]);
      }
      onClose();
    } catch (error) {
      console.error('Error saving food:', error.message);
    }
  };

  return (
    <div className="food-form">
      <h2>{food ? 'Edit Food' : 'Add Food'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nutritional Value"
          value={nutritionalValue}
          onChange={(e) => setNutritionalValue(e.target.value)}
          required
        />
        <button type="submit">{food ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default FoodForm;
