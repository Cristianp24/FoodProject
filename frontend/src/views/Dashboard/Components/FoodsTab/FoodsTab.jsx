import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FoodsTab.css';

const FoodsTab = () => {
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);  // Estado para mostrar/ocultar el modal
  const [currentFood, setCurrentFood] = useState(null); // Almacena el alimento actual que se está editando
  const navigate = useNavigate();  // Inicializar navigate

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
    if (window.confirm('Are you sure you want to delete this food?')) {
      try {
        await axios.delete(`http://localhost:3000/foods/${foodId}`);
        setFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodId));
      } catch (error) {
        console.error('Error deleting food:', error.message);
      }
    }
  };

  const handleEditClick = (food) => {
    // Establece el alimento que se está editando y muestra el modal
    setCurrentFood(food);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentFood(null);  // Limpiar el estado del alimento al cerrar el modal
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/foods/${currentFood.id}`, currentFood);
      alert('Food updated successfully!');

      // Actualizar el estado de los alimentos sin hacer una nueva petición HTTP
      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food.id === currentFood.id ? { ...food, ...currentFood } : food
        )
      );

      setShowModal(false);
      setCurrentFood(null);  // Limpiar el estado después de editar
    } catch (error) {
      console.error('Error updating food:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
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
              <td>
                <img src={food.imageUrl} alt={food.name} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{food.name}</td>
              <td>{food.protein}</td>
              <td>{food.carbohydrates}</td>
              <td>{food.fat}</td>
              <td>{food.fiber}</td>
              <td>{food.calories}</td>
              <td>{food.quanty}</td>
              <td>{food.unit}</td>
              <td>
                <button onClick={() => handleEditClick(food)}>Edit</button>
                <button onClick={() => deleteFood(food.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar alimento */}
      {showModal && currentFood && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Food : {currentFood.name}</h3>
            <form onSubmit={handleEditSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={currentFood.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Protein:
                <input
                  type="number"
                  name="protein"
                  value={currentFood.protein}
                  onChange={handleChange}
                />
              </label>
              <label>
                Carbohydrates:
                <input
                  type="number"
                  name="carbohydrates"
                  value={currentFood.carbohydrates}
                  onChange={handleChange}
                />
              </label>
              <label>
                Fat:
                <input
                  type="number"
                  name="fat"
                  value={currentFood.fat}
                  onChange={handleChange}
                />
              </label>
              <label>
                Fiber:
                <input
                  type="number"
                  name="fiber"
                  value={currentFood.fiber}
                  onChange={handleChange}
                />
              </label>
              <label>
                Calories:
                <input
                  type="number"
                  name="calories"
                  value={currentFood.calories}
                  onChange={handleChange}
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  name="quanty"
                  value={currentFood.quanty}
                  onChange={handleChange}
                />
              </label>
              <label>
                Unit:
                <input
                  type="text"
                  name="unit"
                  value={currentFood.unit}
                  onChange={handleChange}
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  name="imageUrl"
                  value={currentFood.imageUrl}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={handleModalClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodsTab;
