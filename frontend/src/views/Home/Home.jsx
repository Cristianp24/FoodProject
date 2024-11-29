import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/NavBar/Navbar'; // Asegúrate de importar el componente Navbar

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState(JSON.parse(localStorage.getItem('selectedFoods')) || []);
  const [filteredFoods, setFilteredFoods] = useState([]); // Almacena alimentos filtrados
  const [searchQuery, setSearchQuery] = useState(''); // Término de búsqueda

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
          {filteredFoods.map((food) => (
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
    </div>
  );
};

export default Home;
