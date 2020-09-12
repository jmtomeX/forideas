const AuthService = require("../services/auth.service");

let _authService = null;
class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async signUp(req, res) {
    const { body } = req;
    const createdUser = await _authService.signUp(body);
    return res.status(201).send(createdUser);
  }

  async signIn(req, res) {
    const { body } = req;
    const creds = await _authService.signIn(body);
    // devuelve las credenciales, cuando se usa el método send el status por defecto es 200
    return res.send(creds);
  }
}
module.exports = AuthController;
