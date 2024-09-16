const { sequelize } = require('../models'); // Importa la instancia de Sequelize desde tu archivo de modelos


sequelize.sync({ force: true })  // `force: true` recrea las tablas si ya existen
  .then(() => {
    console.log('Base de datos sincronizada'); // Mensaje de éxito
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err); // Mensaje de error si ocurre alguno
  });