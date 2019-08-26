const mysql  = require('../storages/mysql');

class Model {

}

class Todo extends Model {
  async create(todo) {
    return await mysql.update(todo);
  }
  async getAll() {
    return await mysql.getAll();
  }
  async get(id) {
    return await mysql.get(id);
  }
}

module.exports = new Todo()

// const JSONFileStorage = require('../storages/jsonfile');
//
// class Model {
// }
// class Todo extends Model {
//   async create(todo) {
//     var todos = await JSONFileStorage.get();
//     todos.push(todo);
//     await JSONFileStorage.update(todos);
//     return todos.length - 1
//   }
//   async getAll() {
//     return await JSONFileStorage.get();
//   }
//   async get(id) {
//     return (await this.getAll())[id]
//   }
// }
//
// module.exports = new Todo()
