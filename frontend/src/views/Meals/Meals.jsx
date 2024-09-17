import React, { useState, useEffect } from 'react';
import './Meals.css';

const CreateMeal = () => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [mealName, setMealName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    const storedFoods = JSON.parse(localStorage.getItem('selectedFoods')) || [];
    setSelectedFoods(storedFoods);
    setQuantities(storedFoods.reduce((acc, food) => ({ ...acc, [food.id]: 0 }), {}));
  }, []);

  const handleQuantityChange = (foodId, value) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [foodId]: numericValue,
      }));
    } else {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [foodId]: 0,
      }));
    }
  };

  const totalNutrition = selectedFoods.reduce((acc, food) => {
    const quantity = quantities[food.id] || 0;
    return {
      protein: acc.protein + (food.protein * quantity / 100),
      carbohydrates: acc.carbohydrates + (food.carbohydrates * quantity / 100),
      fat: acc.fat + (food.fat * quantity / 100),
      fiber: acc.fiber + (food.fiber * quantity / 100),
      calories: acc.calories + (food.calories * quantity / 100),
    };
  }, {
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    calories: 0,
  });

  const handleSaveMeal = async () => {
    if (!isAuthenticated) {
      alert('You must be logged in to save a meal.');
      return;
    }

    const foodItems = selectedFoods.map(food => ({
      foodId: food.id,
      quantity: quantities[food.id] || 0
    }));

    try {
      const response = await fetch('http://localhost:3000/meals', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ name: mealName, foodItems })
      });
      if (response.ok) {
        alert('Meal created successfully');
        window.location.href = '/';
      } else {
        alert('Failed to create meal');
      }
    } catch (error) {
      console.error('Error creating meal:', error);
    }
  };

  const handleClearAll = () => {
    setSelectedFoods([]);
    setQuantities({});
    localStorage.removeItem('selectedFoods');
  };

  const handleRemoveFood = (foodId) => {
    const updatedFoods = selectedFoods.filter(food => food.id !== foodId);
    setSelectedFoods(updatedFoods);
    setQuantities(prevQuantities => {
      const { [foodId]: _, ...rest } = prevQuantities;
      return rest;
    });
    localStorage.setItem('selectedFoods', JSON.stringify(updatedFoods));
  };

  return (
    <div className="container">
      {selectedFoods.length === 0 ? (
        <p>No foods selected. Please select some foods from the Home page.</p>
      ) : (
        <div className="food-card-container">
          {selectedFoods.map(food => (
            <div key={food.id} className="food-card">
              <img src={food.imageUrl} alt={food.name} className="food-image" />
              <h3>{food.name}</h3>
              <input
                type="number"
                value={quantities[food.id] || ''}
                onChange={(e) => handleQuantityChange(food.id, e.target.value)}
                placeholder="Grams"
                min="0"
              />
              <span>Grams</span>
              <button className="remove-food-btn" onClick={() => handleRemoveFood(food.id)}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="nutrition-summary">
        <h3>Total Nutrition</h3>
        <p>Protein: {totalNutrition.protein.toFixed(2)}g</p>
        <p>Carbohydrates: {totalNutrition.carbohydrates.toFixed(2)}g</p>
        <p>Fat: {totalNutrition.fat.toFixed(2)}g</p>
        <p>Fiber: {totalNutrition.fiber.toFixed(2)}g</p>
        <p>Calories: {totalNutrition.calories.toFixed(2)}kcal</p>
      </div>
      <div className="meal-name-container">
        <input
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          placeholder="Meal Name"
        />
      </div>
      <button className="save-meal-btn" onClick={handleSaveMeal}>
        Save Meal
      </button>
      <button className="clear-all-btn" onClick={handleClearAll}>
        Clear All
      </button>
    </div>
  );
};

export default CreateMeal;
