import React, { useState } from 'react';
import UsersTab from './Components/UsersTab/UsersTab';
import FoodsTab from './Components/FoodsTab/FoodsTab';
import ProfileTab from './Components/ProfileTab/ProfileTab';
import './Dashboard.css';

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
        <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>Users</button>
        <button onClick={() => setActiveTab('foods')} className={activeTab === 'foods' ? 'active' : ''}>Foods</button>
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</button>
      </div>
      <div className="dashboard-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
