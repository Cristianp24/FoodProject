import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FoodsTab = () => {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await axios.get('/api/foods');
      setFoods(response.data);
    };
    fetchFoods();
  }, []);

  const handleAddFood = () => {
    axios.post('/api/foods', { name: newFood }).then(response => {
      setFoods([...foods, response.data]);
      setNewFood('');
    });
  };

  const handleDeleteFood = (foodId) => {
    axios.delete(`/api/foods/${foodId}`).then(() => {
      setFoods(prevFoods => prevFoods.filter(food => food.id !== foodId));
    });
  };

  return (
    <div>
      <h2>Manage Foods</h2>
      <input
        value={newFood}
        onChange={(e) => setNewFood(e.target.value)}
        placeholder="Add new food"
      />
      <button onClick={handleAddFood}>Add Food</button>
      {foods.map(food => (
        <div key={food.id}>
          <span>{food.name}</span>
          <button onClick={() => handleDeleteFood(food.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default FoodsTab;