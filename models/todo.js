const JSONFileStorage = require('../storages/jsonfile');
const pool = require('./db');

class Model {

}

class Todo extends Model {

  async create(todo) {
    const query = `INSERT INTO demo.todos
      (todo)
    VALUES('${todo}');`;
    let conn;
    try {
      conn = await pool.getConnection();
      const { insertId } = await conn.query(query);
      console.log('@@ insertid', insertId);
      return insertId
    } catch (error) {
      return -1 
    } finally {
      conn && conn.end()
    }
  }

  async getAll() {
    const query = `SELECT todo FROM todos`;
    let conn
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(query);
      let rst = Array.from(rows);
      return rst.map(d => d.todo);
    } catch (error) {
      return []
    } finally {
      conn && conn.end()
    }
  }

  async get(id) {
    const query = `SELECT todo FROM todos WHERE id = ${id}`;
    let conn
    try {
      conn = await pool.getConnection();
      const row = await conn.query(query);
      let rst = Array.from(row)[0];
      return rst.todo;
    } catch (error) {
      return ''
    } finally {
      conn && conn.end()
    }
  }
}



module.exports = new Todo()
