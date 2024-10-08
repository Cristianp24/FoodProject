// models/food.js
const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    carbohydrates: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fiber: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quanty: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  Food.associate = models => {
    Food.belongsToMany(models.Meal, {
      through: 'MealFood',
      as: 'meals',
      foreignKey: 'foodId',
    });
  };

  return Food;
};
