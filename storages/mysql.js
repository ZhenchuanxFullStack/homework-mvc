const mysql = require('mysql');

let pool = mysql.createPool({
  host : 'localhost',
  port : 3306,
  user : 'root', 
  password : 'hello123',
  database : 'test'
});

module.exports = {
  async create(todo) {
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO todos (todo) VALUES ('${todo}')`, function (error, results, fields) {
        if (error) throw error;
        resolve(results.insertId);
      });
    })
  },
  async getAll() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT todo FROM todos`, function (error, results, fields) {
        if (error) throw error;
        resolve(JSON.stringify(results.map(item => item.todo)));
      });
    })
  },
  async get(id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT todo FROM todos WHERE id = ${id}`, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results.map(item => item.todo)[0]);
        }
      });
    })
  }
}