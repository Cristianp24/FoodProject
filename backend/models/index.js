const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

// Leer y cargar todos los modelos de la carpeta 'models'
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Ignorar archivos ocultos
      file !== path.basename(__filename) && // Ignorar este archivo (index.js)
      file.slice(-3) === '.js' // Solo cargar archivos JavaScript
    );
  })
  .forEach(file => {
    // Requerir cada modelo y pasarlo a Sequelize
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // Añadir el modelo al objeto db
    db[model.name] = model;
  });

// Configurar asociaciones si existen


// Añadir la instancia de Sequelize y la clase Sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Meal = require('./meal')(sequelize, Sequelize.DataTypes);
db.Food = require('./food')(sequelize, Sequelize.DataTypes);
db.MealFood = require('./mealFood')(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
