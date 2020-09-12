const BaseRepository = require("./base.repository");
let _comment = null;
class CommentRepository extends BaseRepository {
  constructor({ Comment }) {
    //llamamos al constructor de la clase padre pasandole el comentario
    super(Comment);
    _comment = Comment;
  }
}

module.exports = CommentRepository;
