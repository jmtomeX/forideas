const { Router } = require("express");

module.exports = function ({ HomeController }) {
  const router = Router();

  // ruta de prueba
  router.get("/", HomeController.index);
  return router;
};
