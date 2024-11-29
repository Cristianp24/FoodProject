import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodEditModal.css'; // Asegúrate de crear estilos para el modal

const FoodEditModal = ({ foodId, onClose, onFoodUpdated }) => {
  const [food, setFood] = useState({
    name: '',
    protein: '',
    carbohydrates: '',
    fat: '',
    fiber: '',
    calories: '',
    quanty: '',
    unit: '',
  });

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/foods/${foodId}`);
        setFood(response.data);
      } catch (error) {
        console.error('Error fetching food:', error.message);
      }
    };

    if (foodId) {
      fetchFood();
    }
  }, [foodId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/foods/${foodId}`, food);
      onFoodUpdated('¡Alimento actualizado exitosamente!');
      onClose(); // Cierra el modal después de actualizar
    } catch (error) {
      console.error('Error updating food:', error.message);
    }
  };

  return (
    <div className="food-edit-modal">
      <div className="modal-content">
        <h2>Edit Food</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={food.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Protein:
            <input
              type="number"
              name="protein"
              value={food.protein}
              onChange={handleChange}
            />
          </label>
          <label>
            Carbohydrates:
            <input
              type="number"
              name="carbohydrates"
              value={food.carbohydrates}
              onChange={handleChange}
            />
          </label>
          <label>
            Fat:
            <input
              type="number"
              name="fat"
              value={food.fat}
              onChange={handleChange}
            />
          </label>
          <label>
            Fiber:
            <input
              type="number"
              name="fiber"
              value={food.fiber}
              onChange={handleChange}
            />
          </label>
          <label>
            Calories:
            <input
              type="number"
              name="calories"
              value={food.calories}
              onChange={handleChange}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              name="quanty"
              value={food.quanty}
              onChange={handleChange}
            />
          </label>
          <label>
            Unit:
            <input
              type="text"
              name="unit"
              value={food.unit}
              onChange={handleChange}
            />
          </label>
          <div className="modal-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodEditModal;
