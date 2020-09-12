const mongoose = require("mongoose");
const { Schema } = mongoose;
// comparar las contraseñas
// crear un hash de la contraseña
// generar un salt que se le agrega al hash
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
// cada vez que se lea un objeto de tipo user
// Modificamos el método toJson que utiliza mongoose
// eliminamos el campo contraseña
UserSchema.methods.toJSON = function () {
  // método que usa mongoose para que convierta a un objeto js.
  let user = this.toObject();
  delete user.password;
  return user;
};

// todos los documentos de mongo se le incluyen estos métodos (UserSchema.methods.)
// creamos el método para comparar contraseñas comparePassword
UserSchema.methods.comparePassword = function (password) {
  // this corresponde al documento que se está manipulando.
  return compareSync(password, this.password);
};

// hook antes de que se guarde
// no funciona con las funciones de flecha por que pierde el scoope
UserSchema.pre("save", async function (next) {
  const user = this;

  // si no se modifica la contraseña
  if (!user.isModified("password")) {
    return next();
  }

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
});
module.exports = mongoose.model("user", UserSchema);
