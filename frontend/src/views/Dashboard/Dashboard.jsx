import React, { useState } from 'react';
import UsersTab from './Components/UsersTab/UsersTab';
import FoodsTab from './Components/FoodsTab/FoodsTab';
import ProfileTab from './Components/ProfileTab/ProfileTab';
import { useNavigate } from 'react-router-dom';
import FoodEditModal from '../../components/EditFood/FoodEditModal'; // Importar el modal
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [isFoodFormOpen, setIsFoodFormOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  

  const navigate = useNavigate(); // Inicializa useHistory

  const handleGoHome = () => {
    navigate('/home'); // Redirige al home
  };

  // Función para abrir el modal de edición de alimentos
  const handleEditFood = (food) => {
    console.log('Editing food:', food); // Verifica que el alimento seleccionado sea el correcto
    setSelectedFood(food); // Establece el alimento seleccionado
    setIsFoodFormOpen(true); // Abre el modal
  };

  const handleFoodUpdated = (message) => {
    setIsFoodFormOpen(false);
    setActiveTab('foods');
    setSuccessMessage(message); // Muestra el mensaje de éxito
  };

  const renderTabContent = () => {
    if (isFoodFormOpen && selectedFood) {
      return (
        <FoodEditModal
          foodId={selectedFood.id}
          onClose={() => setIsFoodFormOpen(false)} // Cierra el modal
          onFoodUpdated={handleFoodUpdated}
        />
      );
    }

    return (
      <>
        
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'foods' && <FoodsTab onEditFood={handleEditFood} />}
        {activeTab === 'profile' && <ProfileTab />}
      </>
    );
  };

  return (
    <div className="dashboard">
      <div className="dashboard-tabs">
        <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>Users</button>
        <button onClick={() => setActiveTab('foods')} className={activeTab === 'foods' ? 'active' : ''}>Foods</button>
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</button>
        <button className="go-home-btn" onClick={handleGoHome}>Go to Home</button>
      </div>

      <div className="dashboard-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
