const mysql = require('mysql');
const util = require('util');

const db = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '666666',
  database: 'mysql'
};

const pool = mysql.createPool(db);
module.exports = util.promisify(pool.query.bind(pool));
