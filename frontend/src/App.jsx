import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './views/Landing/LandingPage';
import Home from './views/Home/Home';
import Login from './views/Form/Login';
import CreateMeal from './views/Meals/Meals';
import Navbar from './components/NavBar/Navbar';
import UserMeals from './components/UserMeals/userMeals';
import MealDetails from './views/mealDetail/mealDetails';
import SignUp from './views/Form/SigIn';

import './App.css';
function App() {
  //const location = useLocation(); // Use useLocation to determine the path

  return (
    <div className="app-container">
  
      {location.pathname !== '/' && <Navbar />}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-meal" element={<CreateMeal />} />
          <Route path="/meals/user" element={<UserMeals />} />
          <Route path="/meals/:mealId" element={<MealDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
