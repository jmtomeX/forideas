const memoryCache = require("memory-cache");
const { CACHE_KEY } = require("../config");

module.exports = function (duration) {
  return (req, res, next) => {
    // originUrl propiedad de express que nos da la url solicitada
    // si no existe coloca el url como tal, propiedad del obejto request de express
    const key = CACHE_KEY + req.originUrl || req.url;
    // si hay algo cachado lo retorna a la variable
    const cachedBody = memoryCache.get(key);
    if (cachedBody) {
      // retorna en formato json
      return res.send(JSON.parse(cachedBody));
    } else {
      res.sendResponse = res.send; // el .send no se invoca, se le asigna a la nueva propiedad
      // sobreescribe el res.send, poner el body en cache
      res.send = (body) => {
        memoryCache.put(key, body, duration * 1000);
        res.sendResponse(body); // Invocamos la función que hemos creado.
      };
      next();
    }
  };
};
