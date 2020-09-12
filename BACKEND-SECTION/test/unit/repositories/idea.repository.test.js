const { IdeaRepository } = require("../../../src/repositories");

// hacer mocking a entidades de mongoose
const mockingoose = require("mockingoose").default;
const { Idea } = require("../../../src/models");

let {
  IdeaModelMock: { idea, ideas },
} = require("../../mocks");
const jestConfig = require("../../../jest.config");
describe("User Repository Test", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  // método que retorna un usuario por su id
  it("Should return a user by id", async () => {
    // Para evitar la refencia y que no se modifique el objeto creamos _user
    // hacemos una fotocopia de dicho objeto
    const _idea = { ...idea };
    delete _idea.password;

    // cuando utilize un método me va a devolver algo en este caso un objeto usuario
    mockingoose(Idea).toReturn(idea, "findOne");

    const _ideaRepository = new IdeaRepository({ Idea });
    // método get que retorna un usuario por su id. hay que parsearlo
    const expected = await _ideaRepository.get(_idea._id);

    // comprobar si lo que estamos esperando concuerda con lo que viene en expected.
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_idea);
  });


});
