const { Router } = require("express");
const { ParseInMiddleware, AuthMiddleware } = require("../middlewares");
module.exports = function ({ IdeaController }) {
  const router = Router();

  router.get("", [ParseInMiddleware], IdeaController.getAll);
  router.get("/:ideaID", IdeaController.get);
  router.get("/:userID/all", IdeaController.getUserIdeas);
  router.get("/:ideaID/fallos", IdeaController.pruebaFallos);
  router.post("", AuthMiddleware, IdeaController.create);
  //Su función es la misma que PUT, el cual sobreescribe completamente un recurso. Se utiliza para actualizar, de manera parcial una o varias partes. Está orientado también para el uso con proxy.
  router.patch("/:ideaID", AuthMiddleware, IdeaController.update);
  router.delete("/:ideaID", AuthMiddleware, IdeaController.delete);
  router.post("/:ideaID/upvote", AuthMiddleware, IdeaController.upvoteIdea);
  router.post("/:ideaID/downvote", AuthMiddleware, IdeaController.downvoteIdea);
  return router;
};
