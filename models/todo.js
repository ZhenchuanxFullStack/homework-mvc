const query = require('../storages/mysql');

class Model {
}
class Todo extends Model {
  async create(todo) {
    return (await query('insert into todos(todo) values(?)', todo)).insertId
  }
  async getAll() {
    return (await query('select todo from todos')).map(row => row.todo)
  }
  async get(id) {
    try {
      return (await query('select todo from todos where id = ?', id))[0].todo
    } catch {
      return ''
    }
  }
}

module.exports = new Todo()
