const mysql = require('mysql');
const config = require('./config');
// 创建连接池
const pool = mysql.createPool(config.mysql);

module.exports = {
  query: async (sql, callback) => {
    await pool.getConnection((err, conn) =>{
      if(err) {
        callback(err, null);
      } else {
        conn.query(sql, (err2, vals, fields) =>{
          conn.release();
          callback(err2, vals);
        });
      }
    })
  },
  update: (todo) => {
    return new Promise((resolve, reject) =>{
      let sql = `insert into todo (title) values (${todo})`;
      module.exports.query(sql, (err, vals) => {
        if(!err) {
          resolve(1);
        } else {
          resolve(0);
        }       
      });
    })
  },
  get: () => {
    return new Promise((resolve, reject) =>{
      let sql = 'select * from todo';
      let data = [];
      module.exports.query(sql, (err, vals) => {  
        if(!err) {
          (vals || []).forEach(val =>{
            data.push(val.title);
          })
        }
        resolve(data);
      });
    }); 
  }
}
