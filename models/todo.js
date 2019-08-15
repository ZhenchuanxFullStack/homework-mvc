const mysqlStorage = require('../storages/mysql');

class Model {
}
class Todo extends Model {
  async create(todo) {
    return await mysqlStorage.createTodo(todo);
  }
  async getAll() {
    return await mysqlStorage.getAll(); 
  }
  async get(id) {
    try {
      return await mysqlStorage.getForId(id);
    } catch(err) {
      return null;
    }
  }
}

module.exports = new Todo()
