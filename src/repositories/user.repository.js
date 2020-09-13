const BaseRepository = require("./base.repository");
let _user = null;
// heredamos el repositorio base
class UserRepository extends BaseRepository {
  constructor({ User }) {
    //llamamos al constructor de la clase padre
    super(User);
    _user = User;
  }
  async getUserByUsername(username) {
    return await _user.findOne({ username });
  }
}

module.exports = UserRepository;
