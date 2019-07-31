const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'RAN'
});
const TABLE_NAME = 'TodoTable';
module.exports = {
  create: (todo) => {
    if (!todo) {
      return;
    }
    return new Promise((resolve, reject) => {
      pool.query(`insert into ${TABLE_NAME} (name) values ('${todo}');`, function(error, results, fields) {
        if (error) {
          throw error
        }
        resolve(Number(results.insertId));
      })
    })
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      pool.query(`select * from ${TABLE_NAME};`, function(error, results, fields) {
        if (error) {
          throw error
        }
        const result = results.map(item => item.name);
        resolve(JSON.stringify(result));
      })
    })
  },
  get: (todoId) => {
    return new Promise((resolve, reject) => {
      pool.query(`select * from ${TABLE_NAME} where id = ${todoId};`, function(error, results, fields) {
        if (error) {
          resolve(null);
        } else {
          resolve(results[0] ? results[0].name : null);
        }
      })
    })
  }
}
