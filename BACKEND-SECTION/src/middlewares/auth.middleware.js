const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = function (req, res, next) {
  // el token a recoger
  const token = req.headers["authorization"];
  if (!token) {
    const error = new Error();
    error.status = 400;
    error.message = "El token no se ha enviado.";
    throw error;
  }

  // desepcriptamos el token con nuestra misma contraseña
  jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
    // en caso de que el token sea invalido
    if (err) {
      const error = new Error();
      error.status = 401;
      error.message = "Token invalido.";
      throw error;
    }

    // para saber quien está registrado cada vez que haga un request
    req.user = decodedToken.user;
    next();
  });
};
