const MySQLStorage = require('../storages/mysql');

class Model {
}
class Todo extends Model {
  async create(todo) {
    return await MySQLStorage.create(todo);
  }
  async getAll() {
    return await MySQLStorage.getAll();
  }
  async get(id) {
    return await MySQLStorage.get(id);
  }
}

module.exports = new Todo()
