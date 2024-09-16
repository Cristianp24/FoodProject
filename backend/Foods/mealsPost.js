const { Meal, Food, MealFood } = require('../models'); // Ajusta la ruta si es necesario

const createMeal = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { name, foodItems } = req.body;

    // Validar la solicitud
    if (!name || !Array.isArray(foodItems) || foodItems.length === 0) {
      return res.status(400).json({ error: 'Invalid data provided' });
    }

    // Obtener el ID del usuario desde la sesión
    const userId = req.user.id;

    // Variables para sumar los valores nutricionales
    let totalProtein = 0;
    let totalCarbohydrates = 0;
    let totalFat = 0;
    let totalFiber = 0;
    let totalCalories = 0;

    // Iterar sobre los items de comida para calcular los totales
    for (const item of foodItems) {
      const { foodId, quantity } = item;
  
      // Buscar el alimento por ID
      const food = await Food.findByPk(foodId);
      console.log('Valores de food:', food);
console.log('Valor de quantity:', quantity)
      if (!food) {
        return res.status(404).json({ error: `Food with id ${foodId} not found.` });
      }
    
      // Calcular los valores nutricionales basados en la cantidad
      totalProtein += food.protein * (quantity / 100); // Ajuste aquí
      totalCarbohydrates += food.carbohydrates * (quantity / 100); // Ajuste aquí
      totalFat += food.fat * (quantity / 100); // Ajuste aquí
      totalFiber += food.fiber * (quantity / 100); // Ajuste aquí
      totalCalories += food.calories * (quantity / 100); // Ajuste aquí
    }

    // Imprime los totales para ver si se están calculando correctamente
  

    // Crear la comida con los valores totales y asociar al usuario
    const meal = await Meal.create({
      name,
      totalProtein,
      totalCarbohydrates,
      totalFat,
      totalFiber,
      totalCalories,
      userId, // Asociar la comida al usuario autenticado
    });



    return res.status(201).json(meal);
  } catch (error) {
    console.error('Error creating meal:', error);
    return res.status(500).json({ error: 'Error creating meal' });
  }
};


module.exports = { createMeal };