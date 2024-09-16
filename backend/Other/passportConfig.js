const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' }, // Utilizar el campo 'email' para el inicio de sesión
      async (email, password, done) => {
        try {
          // Buscar el usuario por su email
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { message: 'Email not registered' });
          }

          // Verificar la contraseña
          const isMatch = await user.validPassword(password);
          if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
          }

          // Autenticación exitosa
          return done(null, user);
        } catch (error) {
          // Manejo de errores
          return done(error);
        }
      }
    )
  );

  // Serializar el usuario en la sesión
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserializar el usuario desde la sesión
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
