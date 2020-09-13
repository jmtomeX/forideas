class HomeService {
  index() {
    return {
      message: "Hello World",
    };
  }
}
// no se exporta como si fuese un objeto de esta manera --> module.exports = new HomeService();
// si no como nos permite awilix
module.exports = HomeService;
