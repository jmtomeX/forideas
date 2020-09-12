const { UserRepository } = require("../../../src/repositories");
// hacer mocking a entidades de mongoose
const mockingoose = require("mockingoose").default;
const { User } = require("../../../src/models");
let {
  UserModelMock: { users, user },
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
    const _user = { ...user };
    delete _user.password;

    // cuando utilize un método me va a devolver algo en este caso un objeto usuario
    mockingoose(User).toReturn(user, "findOne");

    const _userRepository = new UserRepository({ User });
    // método get que retorna un usuario por su id. hay que parsearlo
    const expected = await _userRepository.get(_user._id);

    // comprobar si lo que estamos esperando concuerda con lo que viene en expected.
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });


  it("Should find a user by username", async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(user, "findOne");

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getUserByUsername(_user.username);
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should return a user collection", async () => {
    users = users.map(user => {
      delete user.password;
      return user;
    });
    mockingoose(User).toReturn(users, "find");

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getAll();
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(users);
  });

  it("Should update an especific user by id", async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(_user, "findOneAndUpdate");

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.update(user._id, {
      name: "PEpito de los palotes"
    });

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should delete an especific user by id", async () => {
    mockingoose(User).toReturn(user, "findOneAndDelete");
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.delete(user._id);
    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  });


});
