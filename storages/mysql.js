const mysql = require("mysql");
const config = require("../.config").db;

var pool = mysql.createPool({
  connectionLimit: 10,
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

pool.query("select * from user limit 1", function(err, results, fields) {
  /* istanbul ignore else  */
  if (results) console.log("mysql online");
  else console.error("mysql", err);

  // const i = 1;
  // if (1 === i) {
  //   console.log();
  // } else if (2 === i) {
  //   console.log();
  // } else {
  //   console.log();
  // }
  function noRun() {
    const ii = 0;
  }
});

module.exports = {
  query: async (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, values, function(err, results) {
        /* istanbul ignore if  */
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
};
