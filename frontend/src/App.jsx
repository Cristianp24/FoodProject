import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './views/Landing/LandingPage';
import Home from './views/Home/Home';
import Login from './views/Form/Login';
import CreateMeal from './views/Meals/Meals';
import Navbar from './components/NavBar/Navbar';
import UserMeals from './components/UserMeals/UserMeals';
import MealDetails from './views/mealDetail/mealDetails';
import SignUp from './views/Form/SigIn';
import RequestPasswordReset from './views/Form/RequestPasswordReset.jsx';
import ResetPassword from './views/Form/ResetPassword.jsx';
import Dashboard from './views/Dashboard/Dashboard.jsx';
import FoodForm from './views/Dashboard/Components/FoodsTab/FoodForm.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import './App.css';
function App() {
  const location = useLocation(); // Use useLocation to determine the path
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="app-container">
  
      {location.pathname !== '/' && location.pathname !== '/dashboard' && <Navbar setSearchQuery={setSearchQuery} />}

      <div className="main-content">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/request-password-reset" element={<RequestPasswordReset />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/home" element={<Home searchQuery={searchQuery} />} />
          <Route path="/create-food" element={<FoodForm />} />
          <Route path="/create-meal" element={<CreateMeal />} />
          <Route path="/meals/:mealId" element={<MealDetails />} />
          <Route path="/meals/users" element={<UserMeals />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
