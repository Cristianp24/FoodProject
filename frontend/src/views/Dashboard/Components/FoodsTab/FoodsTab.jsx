import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FoodsTab.css';

const FoodsTab = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]); // Para almacenar los alimentos filtrados
  const [showModal, setShowModal] = useState(false); 
  const [currentFood, setCurrentFood] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const foodsPerPage = 12; // Número de alimentos por página
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/foods');
        setFoods(response.data); // Actualizar los alimentos
        setFilteredFoods(response.data); // Inicializar con todos los alimentos
      } catch (error) {
        console.error('Error fetching foods:', error.message);
      }
    };
    fetchFoods();
  }, []);  // Este `useEffect` solo se ejecuta una vez al cargar el componente
  

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtrar los alimentos por nombre
    const filtered = foods.filter((food) =>
      food.name.toLowerCase().includes(query)
    );
    setFilteredFoods(filtered);
    setCurrentPage(1); // Resetear a la primera página cuando se haga una búsqueda
  };

  // Calcular los alimentos a mostrar según la página actual
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para eliminar un alimento
  const deleteFood = async (foodId) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      try {
        await axios.delete(`http://localhost:3000/foods/${foodId}`);
  
        // Actualizar los estados de foods y filteredFoods
        setFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodId));
        setFilteredFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodId)); // Filtrar también en los alimentos mostrados
      } catch (error) {
        console.error('Error deleting food:', error.message);
      }
    }
  };

  const handleEditClick = (food) => {
    setCurrentFood(food);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentFood(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Actualizar el alimento en el backend
      await axios.put(`http://localhost:3000/foods/${currentFood.id}`, currentFood);
      alert('Food updated successfully!');
  
      // Actualizar los alimentos en el estado de foods y filteredFoods
      setFoods((prevFoods) => {
        // Reemplazamos el alimento que se está editando con el nuevo alimento
        return prevFoods.map((food) =>
          food.id === currentFood.id ? { ...food, ...currentFood } : food
        );
      });
  
      // También actualizar filteredFoods
      setFilteredFoods((prevFoods) => {
        return prevFoods.map((food) =>
          food.id === currentFood.id ? { ...food, ...currentFood } : food
        );
      });
  
      setShowModal(false);
      setCurrentFood(null);
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

  // Calcular el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredFoods.length / foodsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="foods-tab">
      <h2>Manage Foods</h2>
      
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />

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
          {currentFoods.map((food) => (
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
                <button onClick={() => handleEditClick(food)} className="edit-button">Edit</button>
                <button onClick={() => deleteFood(food.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)} className="page-button">
            {number}
          </button>
        ))}
      </div>

      {/* Modal para editar alimento */}
      {showModal && currentFood && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Food: {currentFood.name}</h3>
            <form onSubmit={handleEditSubmit}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentFood.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Protein</label>
                <input
                  type="text"
                  name="protein"
                  value={currentFood.protein}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Carbohydrates</label>
                <input
                  type="text"
                  name="carbohydrates"
                  value={currentFood.carbohydrates}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Fat</label>
                <input
                  type="text"
                  name="fat"
                  value={currentFood.fat}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Fiber</label>
                <input
                  type="text"
                  name="fiber"
                  value={currentFood.fiber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Calories</label>
                <input
                  type="text"
                  name="calories"
                  value={currentFood.calories}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Quantity</label>
                <input
                  type="text"
                  name="quanty"
                  value={currentFood.quanty}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Unit</label>
                <input
                  type="text"
                  name="unit"
                  value={currentFood.unit}
                  onChange={handleChange}
                />
              </div>
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
