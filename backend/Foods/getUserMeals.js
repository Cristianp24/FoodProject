// Importa los modelos necesarios
const { Meal } = require('../models');

// Controlador para obtener comidas del usuario autenticado
const getUserMeals = async (req, res) => {
  try {
    const userId = req.user.id; // Obtén el ID del usuario autenticado

    // Busca todas las comidas asociadas al usuario
    const meals = await Meal.findAll({
      where: { userId }, // Filtrar por el ID del usuario autenticado
    });

    return res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching user meals:', error);
    return res.status(500).json({ error: 'Error fetching meals' });
  }
};

// Exporta la función para usarla en las rutas
module.exports =  getUserMeals ;
