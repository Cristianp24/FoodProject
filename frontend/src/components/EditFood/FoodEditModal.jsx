import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodEditModal.css';

const FoodEditModal = ({ food, onClose, onSave }) => {
  const [updatedFood, setUpdatedFood] = useState(food);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFood({ ...updatedFood, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedFood);  // Pasa el alimento actualizado al componente principal
    onClose();  // Cierra el modal
  };

  return (
    <div className="modal">
      <h2>Edit {food.name}</h2>
      <form>
        <input
          type="text"
          name="name"
          value={updatedFood.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          value={updatedFood.imageUrl}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSave}>Save Changes</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default FoodEditModal;
