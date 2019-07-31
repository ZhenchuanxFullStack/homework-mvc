// const JSONFileStorage = require('../storages/jsonfile');
const query = require('./../storages/mysql')
class Model {
}
class Todo extends Model {
  async create(todo) {
    let insertId = (await query('insert into todos(todo) values(?)', todo)).insertId
 
    return insertId
  }
  async getAll() {
    let all = (await query('select todo from todos')).map(row => row.todo)

    return all
  }
  async get(id) {
    try {
      let todo = (await query('select todo from todos where id = ?', id))[0].todo

      return todo
    } catch {
      return ''
    }
  }
}

module.exports = new Todo()
