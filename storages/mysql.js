const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1111122963',
    database: 'test',
    "port": '3306'
});

const createTodo = todo => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO todo_tbl (todo) VALUES ('${todo}')`, function (error, results, fields) {
            if (error) throw error;
            resolve(results.insertId);
        });
    });
};

const getAll = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT todo FROM todo_tbl', function (error, results, fields) {
            if (error) throw error;
            resolve(JSON.stringify(results.map(item => item.todo)));
        });
    });
};

const getForId = id => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT todo FROM todo_tbl WHERE todo_id = ${id}`, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results.map(item => item.todo)[0]);
            }
        });
    });
};

module.exports = {
    createTodo: createTodo,
    getAll: getAll,
    getForId: getForId,
};


