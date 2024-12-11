import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FoodsTab.css';

const FoodsTab = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [currentFood, setCurrentFood] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const foodsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/foods');
        console.log('Fetched foods:', response.data); // Verifica los datos que llegan
        setFoods(response.data); 
        setFilteredFoods(response.data); 
      } catch (error) {
        console.error('Error fetching foods:', error.message);
      }
    };
    fetchFoods();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = foods.filter((food) =>
      food.name.toLowerCase().includes(query)
    );
    setFilteredFoods(filtered);
    setCurrentPage(1);
  };

  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteFood = async (foodId) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      try {
        await axios.delete(`http://localhost:3000/foods/${foodId}`);
        setFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodId));
        setFilteredFoods((prevFoods) => prevFoods.filter((food) => food.id !== foodId)); 
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
      await axios.put(`http://localhost:3000/foods/${currentFood.id}`, currentFood);
      alert('Food updated successfully!');
  
      setFoods((prevFoods) => 
        prevFoods.map((food) =>
          food.id === currentFood.id ? { ...food, ...currentFood } : food
        )
      );
  
      setFilteredFoods((prevFoods) =>
        prevFoods.map((food) =>
          food.id === currentFood.id ? { ...food, ...currentFood } : food
        )
      );
  
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

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredFoods.length / foodsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="foods-tab">
      <h2>Manage Foods</h2>

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

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)} className="page-button">
            {number}
          </button>
        ))}
      </div>

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
