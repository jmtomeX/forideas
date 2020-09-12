class BaseService {
  // va a recibir un repositorio de tipo user, comment o idea
  constructor(repository) {
    this.repository = repository;
  }

  async get(id) {
    // si el id no es enviado
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "El ID debe de ser enviado.";
      // el throw lo atrapa el middelware error
      throw error;
    }
    // en caso de que existe buscamos la entidad(usuario, idea, comentario)
    const currentEntity = await this.repository.get(id);
    
    if (!currentEntity) {
        const error = new Error();
        error.status = 404;
        error.message = "La entidad no existe.";
        // el throw lo atrapa el middelware error
        throw error;
    }
    
    // en caso de que exista devolvemos la entidad
    return currentEntity;

  }

  async getAll(pageSize, pageNum){
      return await this.repository.getAll(pageSize, pageNum);
  }
  async create(entity){
      return await this.repository.create(entity);
  }
  async update(id,entity){
    if (!id) {
        const error = new Error();
        error.status = 400;
        error.message = "El ID debe de ser enviado.";
        // el throw lo atrapa el middelware error
        throw error;
      }
     return await this.repository.update(id, entity);
 
  }
  async delete(id){
    if (!id) {
        const error = new Error();
        error.status = 400;
        error.message = "El ID debe de ser enviado.";
        // el throw lo atrapa el middelware error
        throw error;
      }
     return await this.repository.delete(id);
  }
}

module.exports = BaseService;
