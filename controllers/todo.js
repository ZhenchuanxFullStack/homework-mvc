const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const dataFilePath = path.join(__dirname, '../data/todo.json');

const TodoModel = require('../models/todo');

module.exports = {
  index: async ctx => {
    //ctx.render('index')
    ctx.body = '<html>';
  },

  login: async ctx => {
    var data = ctx.request.body;
    if (data.password) { // 伪逻辑
      ctx.session.user = data.user
    }
    ctx.redirect('/', 302);
  },

  create: async ctx => {
    if (ctx.session.user != 'eric') return ctx.status = 401
    var data = ctx.request.body
    var id = await TodoModel.create(data);
    ctx.body = id;
  },

  getAll: async ctx => {
    if (ctx.session.user != 'eric') return ctx.status = 401
    ctx.body = await TodoModel.getAll();
  },

  get: async ctx => {
    if (ctx.session.user != 'eric') return ctx.status = 401
    var todo = await TodoModel.get(ctx.params.id);
    if (todo) {
      ctx.body = todo
    } else {
      ctx.status = 404
    }
  }
}

