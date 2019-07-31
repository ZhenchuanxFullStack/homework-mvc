const {db} = require('./../config/db')
const mysql = require('mysql')
const util = require('util')
const {promisify} = util

// 创建连接池，解决一个单链接操作数据库出现，频繁建立连接然后再关闭，性能开销问题
const pool = mysql.createPool(db);

module.exports = promisify(pool.query.bind(pool))