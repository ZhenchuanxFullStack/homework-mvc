const mysql = require('mysql')
const config = require('../config/default.js')

const pool = mysql.createPool({
  host: config.database.HOST,
  port: config.database.PORT,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
})

class Mysql {

  createTodo (todo) {
    return new Promise((resolve, reject) => {
      pool.query(`INSERT INTO todos (todo) VALUES ("${todo}");`, function (error, results, fields) {
        if (error) {
          throw error
        }
        resolve(Number(results.insertId))
      })
    })
  }

  getTodoList () {
    return new Promise((resolve, reject) => {
      pool.query('SELECT todo from todos LIMIT 4', function (error, results, fields) {
        if (error) {
          throw error
        }
        const result = results.map(item => item.todo)
        resolve(JSON.stringify(result))
      })
    })
  }

  getTodoById (id) {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * from todos where id="${id}"`, function (error, results, fields) {
        if (error) {
          throw error
        }
        resolve(results[0] ? results[0].todo : null)
      })
    })
  }
}

module.exports = new Mysql()
