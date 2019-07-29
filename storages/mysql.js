/* 
创建数据库连接
*/
const { db } = require('../config/config')
const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool(db)
module.exports = util.promisify(pool.query.bind(pool))