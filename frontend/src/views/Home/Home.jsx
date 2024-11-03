import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Asegúrate de crear este archivo CSS

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState(JSON.parse(localStorage.getItem('selectedFoods')) || []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:3000/foods');
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, []);

  const handleSelectFood = (food) => {
    let updatedSelectedFoods;
    if (selectedFoods.some(selected => selected.id === food.id)) {
      // If the food is already selected, remove it
      updatedSelectedFoods = selectedFoods.filter(selected => selected.id !== food.id);
    } else {
      // If the food is not selected, add it
      updatedSelectedFoods = [...selectedFoods, food];
    }
    setSelectedFoods(updatedSelectedFoods);
    localStorage.setItem('selectedFoods', JSON.stringify(updatedSelectedFoods));
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop: '70px' }}>
      <div className="food-grid">
        {foods.map(food => (
          <div 
            key={food.id} 
            className={`food-card ${selectedFoods.some(selected => selected.id === food.id) ? 'selected' : ''}`}
            onClick={() => handleSelectFood(food)}
          >
            <div className="food-card-inner">
              <div className="food-card-front">
                <img src={food.imageUrl} alt={food.name} className="food-image" />
                <h3>{food.name}</h3>
              </div>
              <div className="food-card-back">
                <h3>Nutrition Info</h3>
                <p>Protein: {food.protein}g</p>
                <p>Carbohydrates: {food.carbohydrates}g</p>
                <p>Fat: {food.fat}g</p>
                <p>Fiber: {food.fiber}g</p>
                <p>Calories: {food.calories}kcal</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
