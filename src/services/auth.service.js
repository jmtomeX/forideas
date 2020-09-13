const { generateToken } = require("../helpers/jwt.helper");
let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }
  async signUp(user) {
    // extraemos el username
    const { username } = user;

    const userExist = await _userService.getUserByUsername(username);
    if (userExist) {
      const error = new Error();
      error.status = 400;
      error.message = "El usuario ya existe.";
      throw error;
    }

    // si no existe
    return await _userService.create(user);
  }
  async signIn(user) {
    const { username, password } = user;

    const userExist = await _userService.getUserByUsername(username);
    if (!userExist) {
      const error = new Error();
      error.status = 404;
      error.message = "El usuario no existe.";
      throw error;
    }

    const validPassword = userExist.comparePassword(password);
    if (!validPassword) {
      const error = new Error();
      error.status = 401;
      error.message = "Contraseña invalida.";
      throw error;
    }

    // creamos un objeto para encriptar el token
    const userToEncode = {
      username: userExist.username,
      id: userExist._id,
    };

    // si da error mirar minuto 12 video autentificación
    // generar token
    const token = generateToken(userToEncode);

    return { token, user: userExist };
  }
}

module.exports = AuthService;
