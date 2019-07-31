var mysql = require('mysql');

var pool  = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'duan1234',
  database:'test'
});

module.exports = {
  update: (todos) => {
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO todo VALUES ("${todo}")`, function(error, results, fields) {
        if (error) {
          throw error
        }
        resolve(Number(results.insertId));
      })
    })
  },
  get: (todoId) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT todo FROM todos WHERE id=${id}`, function(error, results, fields) {
        if (error) {
          throw error
        } else {
          resolve(results[0] ? results[0].name : null);
        }
      })
    })
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT todo FROM todos`, function(error, results, fields) {
        if (error) {
          throw error
        }
        resolve(JSON.stringify(result));
      })
    })
  }
}