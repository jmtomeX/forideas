// castear a number el string
// myapi.com?pageNum=5
module.exports = function (req, res, next) {
  const queryStrings = req.query;

  for (const key in queryStrings) {
    
    const length = queryStrings[key].length;
    // los _id de mongoose tienen una longitud de 20 caracteres
    // por lo que así comprobamos que no sea un _id
    // si es mayor a 20 retorna un false
    const isValid = length > 20 ? false : !isNaN(parseInt(queryStrings[key]));
    // si la longitud es inferior a 20
    if (isValid) {
      queryStrings[key] = parseInt(queryStrings[key]);
    }
  }
  // igualamos al ojeto principal. Si no hay números se queda como estaba
  req.query = queryStrings;
  // next le da paso al siguiente middelware de la cola de express.
  next();
};
