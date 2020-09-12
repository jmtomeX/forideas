let _homeService = null;

class HomeController {
    // el parámetro HomeService se lo pasa el container (homeService). Se ha de llamar igual.
    constructor({HomeService}){
        _homeService = HomeService;
    }

    index(req,res){
        return res.send(_homeService.index())
    }
}

module.exports = HomeController;