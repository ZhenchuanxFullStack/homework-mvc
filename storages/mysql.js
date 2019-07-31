const mysql = require('mysql')

// 链接池：创建多个链接、复用与分发链接
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root123456',
    database: 'test'
})

module.exports = {
    create: todo => {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO todos (todo) VALUES ('${todo}')`, function (error, results, fields) {
                if (error) throw error;
                resolve(results.insertId);
            });
        })
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT todo FROM todos`, function (error, results, fields) {
              if (error) throw error;
              resolve(JSON.stringify(results.map(item => item.todo)));
            });
        })
    },
    get: id => {
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

