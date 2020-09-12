// esta clase es heredada por todos los repositorios
class BaseRepository {
  // recibe un modelo de mongoose
  constructor(model) {
    this.model = model;
  }
  // obtener un documento de mongo mediante su id
  async get(id) {
    return await this.model.findById(id);
  }

  // retornar todos los documentos de una colección
  // limitamos a 5 el número de recursos y la página que queremos saber con pageNum
  async getAll(pageSize = 5, pageNum = 1) {
    // páginación
    const skips = pageSize * (pageNum - 1);
    return await this.model.find().skip(skips).limit(pageSize);
  }

  async create(entity) {
    return await this.model.create(entity);
  }

  async update(id,entity) {
    return await this.model.findByIdAndUpdate(id, entity, { new: true });
  }

  async delete(id) {
    await this.model.findByIdAndDelete(id);
    // para evitar retornar lo que mongoose nos devuelve, enviamos un true
    return true;
  }
}

module.exports = BaseRepository;
