const db = require('../storages/mysql');

class Model {
}
class Todo extends Model {
  async create(todo) {
    var id = await db.query('INSERT INTO todo(name) VALUES (?); ', [todo])
    return id
  }
  async getAll() {
    var result = [];
    var data = await db.query('select name from todo');
    for (var i in data) {
      result.push(data[i])
    }
    return result
  }
  async get(id) {
    var data = await db.query('select name from todo where id=?', [id]);
    return data[0] && data[0].name
  }
}

module.exports = new Todo()
