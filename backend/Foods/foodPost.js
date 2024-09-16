// foods/foodPost.js
const { Food } = require('../models');

const createFood = async (req, res) => {
  try {
    const { name, protein, carbohydrates, fat, fiber, calories, quanty,unit, imageUrl } = req.body;

    // Crea un nuevo registro en la base de datos
    const newFood = await Food.create({
      name,
      protein,
      carbohydrates,
      fat,
      fiber,
      calories,
      quanty,
      unit,
      imageUrl,  // Asigna la URL de la imagen al nuevo registro
    });

    res.status(201).json(newFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo crear el alimento.' });
  }
};

module.exports = {
  createFood,
};
