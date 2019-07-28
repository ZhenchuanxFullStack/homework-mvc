const JSONStorage = require('../storages/json')

module.exports = {
  create: async data => {
    return await JSONStorage.add(data.todo);
  },
  getAll: async () => {
    return await JSONStorage.getAll();
  },
  get: async (id) => {
    return (await JSONStorage.getAll())[id];
  }
}
