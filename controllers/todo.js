const TodoModel = require('../models/todo');
const TodoMysql = require('../models/todoMYSQL')
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
    try{
      const data = await TodoMysql.query(`INSERT INTO test (todo) VALUES ('一条新的todo')`)
      if (data) {
        ctx.body = 1
      } else {
        ctx.body = 'gameover123'
      }
    }catch(e){
      ctx.status = 404
    }
  },
  getAll: async ctx => {
    if (ctx.session.user != 'eric') return ctx.status = 401
    const data = await TodoMysql.query(`select * from test`)
    if (data[0]) {
      const arr = data[0].map(item => item.todo)
      console.log('老湿，这里有问题啊，数据多一条就对不上了！！！')
      ctx.body = JSON.stringify(arr)
    } else {
      ctx.body = 'gameover'
    }
  },
  get: async ctx => {
    if (ctx.session.user != 'eric') return ctx.status = 401
    var todo = await TodoMysql.query(`select * from test where id = '${ctx.params.id}'`)
    if (todo[0].length) {
      ctx.body = todo[0][0].todo;
    } else {
      ctx.status = 404
    }
  }
}
