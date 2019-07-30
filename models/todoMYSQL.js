const mysql = require('mysql2');

const pool = mysql.createPool({
  host:'172.29.92.43',
  user: 'root', 
  database: 'test',
});

const promisePool = pool.promise();

module.exports = promisePool;