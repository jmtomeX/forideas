const { CommentRepository } = require("../../../src/repositories");
// hacer mocking a entidades de mongoose
const mockingoose = require("mockingoose").default;
const { Comment } = require("../../../src/models");


let {
  CommentModelMock: { comment, comments },
} = require("../../mocks");
const jestConfig = require("../../../jest.config");

describe("COmment repository Tests", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it("Debería devolver un comentario por su id", async () => {
    const _comment = { ...comment };

    mockingoose(Comment).toReturn(comment, "findOne");
    const _userRepository = new CommentRepository({ Comment });

    const expected = await _userRepository.get(_comment._id);
    //expected sea igual a _comment
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_comment);
  });

  /*
  it("Should create an especific comment by id", async () => {
    mockingoose(Comment).toReturn("create");
    const _commentRepository = new CommentRepository({ Comment });
    const expected = await _commentRepository.create();

    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  });
*/

  it("Should update an especific comment by id", async () => {
    const _comment = { ...comment };
    mockingoose(Comment).toReturn(_comment, "findOneAndUpdate");
    const _commentRepository = new CommentRepository({ Comment });
    const expected = await _commentRepository.update(comment._id, {
      name: "PEpito de los palotes",
    });

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_comment);
  });

  it("Should delete an especific comment by id", async () => {
    mockingoose(Comment).toReturn(comment, "findOneAndDelete");
    const _commentRepository = new CommentRepository({ Comment });
    const expected = await _commentRepository.delete(comment._id);
    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  });

});

