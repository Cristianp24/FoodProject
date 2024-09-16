import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './views/Landing/LandingPage';
import Home from './views/Home/Home';
import Login from './views/Form/Login';
import CreateMeal from './views/Meals/Meals';
import Navbar from './components/NavBar/Navbar';
import UserMeals from './components/UserMeals/userMeals';
import MealDetails from './views/mealDetail/mealDetails'; // Importa el componente de detalles
import SignUp from './views/Form/SigIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <SignUp />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/create-meal"
          element={
            <>
              <Navbar />
              <CreateMeal />
            </>
          }
        />
        <Route
          path="/meals/user"
          element={
            <>
              <Navbar />
              <UserMeals />
            </>
          }
        />
        {/* Nueva ruta para ver los detalles de una comida específica */}
        <Route 
          path="/meals/:mealId" 
          element={
            <>
              <Navbar />
              <MealDetails />
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
