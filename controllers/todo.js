const TodoModel = require('../models/todo');

module.exports = {
  indexPage: async (ctx) => {
    ctx.body = "<html>"
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
    ctx.body = await TodoModel.create(ctx.request.body.todo);
  },
  getAll: async ctx => {
    if (ctx.session.user != 'eric') return ctx.status = 401
    ctx.body = await TodoModel.getAll();
  },
  get: async ctx => {
    if (ctx.session.user != 'eric') return ctx.status = 401
    var todo = await TodoModel.get(ctx.params.id)
    if (todo) {
      ctx.body = todo;
    } else {
      ctx.status = 404
    }
  }
}
