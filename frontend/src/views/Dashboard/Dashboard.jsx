import React, { useState } from 'react';
import UsersTab from './Components/UsersTab/UsersTab';
import FoodsTab from './Components/FoodsTab/FoodsTab';
import ProfileTab from './Components/ProfileTab/ProfileTab';
import { useNavigate } from 'react-router-dom'; 
import './Dashboard.css';

const Dashboard = () => {
  
  const [activeTab, setActiveTab] = useState('users');
  const [isFoodFormOpen, setIsFoodFormOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate(); // Inicializa useHistory

  const handleGoHome = () => {
    navigate('/home'); // Redirige al home
  };

  // Función para abrir el formulario de alimentos
  const handleOpenFoodForm = (food) => {
    setSelectedFood(food);
    setIsFoodFormOpen(true);
  };

  // Función para cerrar el formulario de alimentos
  const handleCloseFoodForm = () => {
    setIsFoodFormOpen(false);
    setActiveTab('foods'); // Cambia a la pestaña de alimentos al cerrar el formulario
  };

  const handleFoodUpdated = (message) => {
    setIsFoodFormOpen(false);
    setActiveTab('foods');
    setSuccessMessage(message); // Muestra el mensaje de éxito
  };

  const renderTabContent = () => {
    if (isFoodFormOpen) {
      return (
        <FoodForm
          food={selectedFood}
          onClose={handleCloseFoodForm}
          onFoodUpdated={() => handleFoodUpdated('¡Alimento creado/actualizado exitosamente!')}
        />
      );
    }

    return (
      <>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'foods' && <FoodsTab onAddFood={() => handleOpenFoodForm(null)} onEditFood={handleOpenFoodForm} />}
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
