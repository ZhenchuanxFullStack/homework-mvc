const JSONFileStorage = require('../storages/jsonfile');
const db = require('../storages/mysql');

console.log(db);

class Model {}
class Todo extends Model {
  async create(todo) {
    var todos = await JSONFileStorage.get();
    todos.push(todo);
    await JSONFileStorage.update(todos);
    return (await db('insert into todos(todo) values(?)', todo)).insertId;
  }
  async getAll() {
    return (await db('select todo from todos')).map((row) => row.todo);
  }
  async get(id) {
    return (await this.getAll())[id];
  }
}

module.exports = new Todo();
