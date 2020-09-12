const BaseService = require("./base.service");
let _ideaRepository = null;
class IdeaService extends BaseService {
  constructor({ IdeaRepository }) {
    super(IdeaRepository);
    _ideaRepository = IdeaRepository;
  }

  async getUserIdeas(author) {
    if (!author) {
      const error = new Error();
      error.status = 400;
      error.message = "Debes mandar un usuario";
      throw error;
    }
    return await _ideaRepository.getUserIdeas(author);
  }
  // dar un voto
  async upvoteIdea(ideaID) {
    if (!ideaID) {
      const error = new Error();
      error.status = 400;
      error.message = "Debes mandar un ideaID";
      throw error;
    }
    const idea = await _ideaRepository.get(ideaID);

    if (!idea) {
      const error = new Error();
      error.status = 400;
      error.message = "La idea no existe";
      throw error;
    }

    // se queda en memoria
    idea.upvotes.push(true);

    // manda a la base de datos
    console.log("downvotes downvote service " + idea.upvotes);
    return await _ideaRepository.update(ideaID, { upvotes: idea.upvotes });
  }

  pruebaFallos() {
    return {
      message: "Esto es para probar el servicio ideaService",
    };
  }

  // Dar un voto negativo
  async downvoteIdea(ideaID) {
    if (!ideaID) {
      const error = new Error();
      error.status = 400;
      error.message = "Debes mandar un ideaID";
      throw error;
    }
    const idea = await _ideaRepository.get(ideaID);

    if (!idea) {
      const error = new Error();
      error.status = 400;
      error.message = "La idea no existe";
      throw error;
    }

    // se queda en memoria
    idea.downvotes.push(true);
    console.log("downvotes downvote service " + idea.downvotes);
    // manda a la base de datos
    return await _ideaRepository.update(ideaID, { downvotes: idea.downvotes });
  }
}

module.exports = IdeaService;
