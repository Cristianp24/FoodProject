// models/mealFood.js
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return MealFood;
};
