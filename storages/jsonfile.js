const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const dataFilePath = path.join(__dirname, '../data/todo.json');

module.exports = {
  update: async (todos) => {
    await writeFile(dataFilePath, JSON.stringify(todos), {flag:'w'})
  },
  get: async () => {
    try {
      return JSON.parse((await readFile(dataFilePath)).toString())
    } catch(e) {
      return []
    }
  }

}
