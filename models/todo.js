const MYSQL = require('../mysql')

class Model {
}
class Todo extends Model {
  async create (todo) {
    return await MYSQL.createTodo(todo)
  }
  async getAll () {
    return await MYSQL.getTodoList()
  }
  async get (id) {
    return await MYSQL.getTodoById(id)
  }
}

module.exports = new Todo()
