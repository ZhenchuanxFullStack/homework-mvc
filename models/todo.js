const JSONFileStorage = require('../storages/jsonfile');

class Model {
}
class Todo extends Model {
  async create(todo) {
    const ret = await JSONFileStorage.update(todo);
    if(ret) {
      const todos = await module.exports.getAll();
      return todos.length - 1;
    }
    return 0;
  }
  async getAll() {
    const todos = await JSONFileStorage.get();
    return todos;
  }
  async get(id) {
    let todos = await this.getAll();
    if(todos.length > 0 && id){
      return todos[id];
    } else {
      return null;
    }
  }
}

module.exports = new Todo()
