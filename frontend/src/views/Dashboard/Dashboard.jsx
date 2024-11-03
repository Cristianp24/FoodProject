import React, { useState } from 'react';
import UsersTab from './Components/UsersTab';
import FoodsTab from './Components/FoodsTab';
import ProfileTab from './Components/ProfileTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return <UsersTab />;
      case 'foods':
        return <FoodsTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-tabs">
        <button onClick={() => setActiveTab('users')}>Users</button>
        <button onClick={() => setActiveTab('foods')}>Foods</button>
        <button onClick={() => setActiveTab('profile')}>Profile</button>
      </div>
      <div className="dashboard-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;