const mysql = require('mysql');
const config = require('../.config').db;

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : config.host,
  user            : config.user,
  password        : config.password,
  database        : config.database
});

//测试数据库的连通性
pool.query('select * from user limit 1', function(err, results, fields){
  /* istanbul ignore else  */
  if (results) console.log("mysql online")
  else console.error('mysql', err)
})

module.exports = {
  query: async (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, values, function(err, results){
        /* istanbul ignore if  */
        if (err) reject(err)
        else resolve(results)
      })
    })
  }
};
