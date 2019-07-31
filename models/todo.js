const MysqlStorage = require('../storages/mysql')

class Model {
}
class Todo extends Model {
  async create(todo) {
    return await MysqlStorage.create(todo);
  }
  async getAll() {
    return await MysqlStorage.getAll();
  }
  async get(id) {
    try {
        return await MysqlStorage.get(id)
    } catch (error) {
        return null
    }
  }
}

module.exports = new Todo()
