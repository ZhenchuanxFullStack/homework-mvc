const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const dataFilePath = path.join(__dirname, '../data/todo.json');

module.exports = {
  add: async todo => {
    var todos = await module.exports.getAll();
    todos.push(todo)
    await writeFile(dataFilePath, JSON.stringify(todos), {flag:'w'})
    return todos.length-1 // return id
  },
  getAll: async () => {
    try {
      return JSON.parse((await readFile(dataFilePath)).toString())
    } catch(e) {
      return []
    }
  }
}
