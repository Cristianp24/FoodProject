import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FoodForm.css';

const FoodForm = ({ food, onClose, onFoodUpdated }) => {
  const [name, setName] = useState('');
  const [protein, setProtein] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [fat, setFat] = useState('');
  const [fiber, setFiber] = useState('');
  const [calories, setCalories] = useState('');
  const [quanty, setQuanty] = useState('');
  const [unit, setUnit] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (food) {
      setName(food.name);
      setProtein(food.protein);
      setCarbohydrates(food.carbohydrates);
      setFat(food.fat);
      setFiber(food.fiber);
      setCalories(food.calories);
      setQuanty(food.quanty);
      setUnit(food.unit);
      setImageUrl(food.imageUrl);
    }
  }, [food]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (food) {
        await axios.put(`http://localhost:3000/foods/${food.id}`, { name, protein, carbohydrates, fat, fiber, calories, quanty, unit, imageUrl }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onFoodUpdated('¡Alimento actualizado exitosamente!');
      } else {
        const response = await axios.post('http://localhost:3000/foods', { name, protein, carbohydrates, fat, fiber, calories, quanty, unit, imageUrl }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onFoodUpdated('¡Alimento creado exitosamente!');
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar el alimento:', error.message);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="food-form">
      <h2>{food ? 'Editar Alimento' : 'Agregar Alimento'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Proteína (g)"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Carbohidratos (g)"
          value={carbohydrates}
          onChange={(e) => setCarbohydrates(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Grasa (g)"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Fibra (g)"
          value={fiber}
          onChange={(e) => setFiber(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Calorías (kcal)"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={quanty}
          onChange={(e) => setQuanty(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Unidad (e.g., gramos)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">{food ? 'Actualizar' : 'Crear'}</button>
        <button type="button" onClick={handleCancel}>
      Cancelar
    </button>
        
      </form>
    </div>
  );
};

export default FoodForm;
