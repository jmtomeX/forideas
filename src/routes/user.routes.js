const { Router } = require("express");
const {
  AuthMiddleware,
  ParseInMiddleware,
  CacheMiddleware,
} = require("../middlewares");

const { CACHE_TIME } = require("../helpers");

module.exports = function ({ UserController }) {
  const router = Router();

  router.get(
    "",
    [AuthMiddleware, ParseInMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)],
    UserController.getAll
  );
  router.get("/:userID", UserController.get);
  //Su función es la misma que PUT, el cual sobreescribe completamente un recurso. Se utiliza para actualizar, de manera parcial una o varias partes. Está orientado también para el uso con proxy.
  router.patch("/:userID", AuthMiddleware, UserController.update);
  router.delete("/:userID", AuthMiddleware, UserController.delete);
  return router;
};
