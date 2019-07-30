const mariadb = require('mariadb');
const dbConf = require('../config/db');

const pool = mariadb.createPool(dbConf);

module.exports = pool;