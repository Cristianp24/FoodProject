const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { createFood } = require('./Foods/foodPost');
const getAllFoods = require('./Foods/getAllFoods');
const { createMeal } = require('./Foods/mealsPost');
const { getAllMeals } = require('./Foods/getAllMeals');
const { User } = require('./models'); // Asegúrate de tener un modelo User
const { Meal } = require('./models');
const { Food } = require('./models');
const passportConfig = require('./Other/passportConfig'); // Archivo de configuración de passport
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const  getUserMeals  = require('../backend/Foods/getUserMeals');
const bcrypt = require('bcrypt');



const PORT = process.env.PORT || 3000;
const app = express();

// Middleware personalizado para logging
const myOwnMiddleware = (req, res, next) => {
    console.log("Middleware applied!!");
    next();
};



app.use(cors({
  origin: 'http://localhost:5173', // Asegúrate de que coincida con tu URL de frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configuración básica de express
app.use(express.json());
app.use(morgan('dev'));
app.use(myOwnMiddleware);

// Configuración de la sesión
app.use(session({
    secret: 'secret', // Cambia esto a una clave secreta segura
    resave: false,
    saveUninitialized: true,
}));

// Inicialización de passport y sesión de usuario
app.use(passport.initialize());
app.use(passport.session());

// Configuración de passport
passportConfig(passport);

// Rutas básicas
app.get('/', (req, res) => {
    res.json("Hola Mundo");
});

app.get('/users', (req, res) => {
    res.json("Hola Users");
});

// Rutas para alimentos y comidas
app.get('/food', getAllFoods);
app.post('/food', createFood);
app.delete('/food/:id', async (req, res) => {
  try {
      const foodId = req.params.id;

      // Verifica si el alimento existe
      const food = await Food.findByPk(foodId);
      if (!food) {
          return res.status(404).json({ message: 'Food not found.' });
      }

      // Elimina el alimento
      await food.destroy();

      res.status(200).json({ message: 'Food deleted successfully.' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting food', error: error.message });
  }
});


app.get('/meals', getAllMeals);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Si no hay token, retorna no autorizado

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // Si el token no es válido
    req.user = user;
    next(); // Si el token es válido, pasa al siguiente middleware/controlador
  });
};
  
 app.get('/meals/user', authenticateToken, getUserMeals);

 app.get('/meals/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const meal = await Meal.findByPk(id); // Asume que usas Sequelize
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json(meal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
  // Usa el middleware en las rutas protegidas
  app.post('/meals', authenticateToken, createMeal);


// Ruta para registro de usuarios
// Ruta para registro de usuarios
app.post('/register', async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Verifica que el nombre, el email y la contraseña no estén vacíos
      if (!name || !email || !password) {
          return res.status(400).json({ message: 'Name, email, and password are required.' });
      }

      // Verifica si el email ya está registrado
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
          return res.status(400).json({ message: 'Email is already in use.' });
      }

      // Hashea la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crea el nuevo usuario con el nombre, email y contraseña hasheada
      const newUser = await User.create({ name, email, password: hashedPassword });

      res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});




// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.validPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
        expiresIn: '1h', // Token expiration time
      });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// Ruta protegida (solo accesible si el usuario está autenticado)
app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ message: 'You are authenticated' });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Logout error', error: err.message });
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
