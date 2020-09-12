const container = require("./src/startup/container");
const server = container.resolve("app");
const { MONGO_URI } = container.resolve("config");
// inicializamos mongoose
const mongoose = require("mongoose");
// para que ponga un índice
mongoose.set("useCreateIndex", true);
// retorna una promesa
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  })
  .then(
    () => server.start() // iniciamos el servidor
  )
  .catch(console.log);
