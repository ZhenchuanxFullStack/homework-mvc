const mysql  = require('../storages/mysql');

class Todo extends Model {
  async create(todo) {
    return await mysql.update(todos);
  }
  async getAll() {
    return await mysql.getAll();
  }
  async get(id) {
    return await mysql.get(id);
  }
}

module.exports = new Todo()
