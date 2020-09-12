// contenedor de inyección de dependencias controlado por AWILIX
// inyectar objetos como si fuesen (asClass(clase), asValue(valor), asFunction(función))
const { createContainer, asClass, asValue, asFunction } = require("awilix");
// Importamos capas a usar (Solicitar)
//services
const {
  HomeService,
  UserService,
  IdeaService,
  CommentService,
  AuthService,
} = require("../services");

// config
const config = require("../config");
// app lo interpreta como la clase que tenemos Server en el index.
const app = require(".");

//controllers
const {
  HomeController,
  UserController,
  IdeaController,
  CommentController,
  AuthController
} = require("../controllers");

// routes
const {
  HomeRoutes,
  UserRoutes,
  IdeaRoutes,
  CommentRoutes,
  AuthRoutes
} = require("../routes/index.routes");
const Routes = require("../routes");

const container = createContainer();

// models
const { User, Comment, Idea } = require("../models");

// repositorios
const {
  UserRepository,
  IdeaRepository,
  CommentRepository,
} = require("../repositories");

// inyección de clase, segmentado en varios registros
container
  .register({
    // configuración principal
    app: asClass(app).singleton(),
    router: asFunction(Routes).singleton(),
    config: asValue(config),
  })
  .register({
    // servicios
    // singleton pide que siempre sea la misma instancia de la clase compartida con las diferentes partes
    // inyecta la clase HomeService en el controlador
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    CommentService: asClass(CommentService).singleton(),
    AuthService: asClass(AuthService).singleton(),
  })
  .register({
    // controladores
    // para mantener el scope se usa bind
    HomeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    AuthController: asClass(AuthController.bind(AuthController)).singleton(),
    CommentController: asClass(
      CommentController.bind(CommentController)
    ).singleton(),
  })
  .register({
    // rutas
    HomeRoutes: asFunction(HomeRoutes).singleton(),
    UserRoutes: asFunction(UserRoutes).singleton(),
    IdeaRoutes: asFunction(IdeaRoutes).singleton(),
    CommentRoutes: asFunction(CommentRoutes).singleton(),
    AuthRoutes: asFunction(AuthRoutes).singleton(),
  })
  .register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment),
  })
  .register({
    UserRepository: asClass(UserRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
  });

module.exports = container;
