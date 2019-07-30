const JSONFileStorage = require("../storages/jsonfile");
const Mysql = require("../storages/mysql");

class Model {}
class Todo extends Model {
  async create(todo) {

    return await Mysql.add(todo);
  }
  async getAll() {
    return await Mysql.get();
  }
  async get(id) {
    return (await this.getAll())[id];
  }
}

module.exports = new Todo();
