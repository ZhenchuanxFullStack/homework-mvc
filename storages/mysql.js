const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: ",rZZEzH]z98MRfEoHAMM",
  database: "miao"
});

class MySql {
  static add(todo) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO todos (todo) VALUES ("${todo}")`,
        (err, results, fields) => {
          if (err) {
            throw err;
          }
          resolve(results.insertId);
        }
      );
    });
  }
  static get() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT todo FROM todos LIMIT 4", (err, results, fields) => {
        if (err) {
          throw err;
        }

        resolve(results.map(r => r.todo));
      });
    });
  }
  static getById(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT todo FROM todos WHERE id=${id}`,
        (err, results, fields) => {
          if (err) {
            throw err;
          }

          !!results.length ? resolve(results[0].todo) : resolve(null);
        }
      );
    });
  }
}

module.exports = MySql;
