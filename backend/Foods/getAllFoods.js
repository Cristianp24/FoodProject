// Importa el modelo desde el archivo index.js en la carpeta models
const { Food } = require('../models');

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los alimentos', error: error.message });
  }
};

module.exports = getAllFoods;
