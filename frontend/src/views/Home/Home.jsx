import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/NavBar/Navbar'; // Asegúrate de importar el componente Navbar

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState(JSON.parse(localStorage.getItem('selectedFoods')) || []);
  const [filteredFoods, setFilteredFoods] = useState([]); // Almacena alimentos filtrados
  const [searchQuery, setSearchQuery] = useState(''); // Término de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [foodsPerPage] = useState(12); // Número de alimentos por página

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:3000/foods');
        const data = await response.json();
        setFoods(data);
        setFilteredFoods(data); // Inicialmente muestra todos los alimentos
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, []);

  // Calcular los alimentos a mostrar en la página actual
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

  // Cambiar a la página siguiente
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredFoods.length / foodsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Ir a una página específica
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generar números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredFoods.length / foodsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Filtrar alimentos según el término de búsqueda
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredFoods(foods); // Si no hay búsqueda, mostrar todos los alimentos
    } else {
      const filtered = foods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filtrar por nombre de alimento
      );
      setFilteredFoods(filtered);
    }
  }, [searchQuery, foods]);

  const handleSelectFood = (food) => {
    let updatedSelectedFoods;
    if (selectedFoods.some((selected) => selected.id === food.id)) {
      updatedSelectedFoods = selectedFoods.filter((selected) => selected.id !== food.id);
    } else {
      updatedSelectedFoods = [...selectedFoods, food];
    }
    setSelectedFoods(updatedSelectedFoods);
    localStorage.setItem('selectedFoods', JSON.stringify(updatedSelectedFoods));
  };

  return (
    <div>
      {/* Pasa la función setSearchQuery como prop */}
      <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />

      {/* Alimentos filtrados */}
      <div style={{ padding: '20px', textAlign: 'center', marginTop: '70px' }}>
        <div className="food-grid">
          {currentFoods.map((food) => (
            <div
              key={food.id}
              className={`food-card ${
                selectedFoods.some((selected) => selected.id === food.id) ? 'selected' : ''
              }`}
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

      {/* Paginación */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => goToPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === pageNumbers.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
