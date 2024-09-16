const { Meal, Food} = require('../models');

const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.findAll({
      include: [
        {
          model: Food,
          as: 'foods',
          through: {
            attributes: ['quantity']
          }
        }
      ]
    });
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error al obtener las comidas:', error);
    res.status(500).json({ error: 'Error al obtener las comidas' });
  }
};

module.exports = {
  getAllMeals,
};
