const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const koaStatic = require('koa-static-prefix');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const dataFilePath = path.join(__dirname, 'data/todo.json');

app.use(koaStatic(path.join(__dirname, 'static'), {pathPrefix: '/static'}))
app.use(session({
  key: 'koa:sess',
  signed: false
}, app));

app.use(bodyparser())

var router = new Router();

router.get('/', async ctx => {
  ctx.body = '<html>';
})

router.post('/login', async ctx => {
  var data = ctx.request.body;
  if (data.password) { // 伪逻辑
    ctx.session.user = data.user
  }
  ctx.redirect('/', 302);
})

router.post('/api/todo', async ctx => {
  if (ctx.session.user != 'eric') return ctx.status = 401
  var data = ctx.request.body
  var todos = null;
  try {
    todos = await readFile(dataFilePath)
    todos = JSON.parse(todos.toString())
  } catch(e) {
    todos = []
  }
  todos.push(data.todo)
  await writeFile(dataFilePath, JSON.stringify(todos), {flag:'w'})
  ctx.body = todos.length-1 // return id
})

router.get('/api/todo', async ctx => {
  if (ctx.session.user != 'eric') return ctx.status = 401
  var data = await readFile(dataFilePath)
  try {
    ctx.body = (await readFile(dataFilePath)).toString()
  } catch(e) {
    ctx.body = []
  }
})

router.get('/api/todo/:id', async ctx => {
  if (ctx.session.user != 'eric') return ctx.status = 401
  var todos = null;
  try {
    todos = await readFile(dataFilePath)
    todos = JSON.parse(todos.toString())
  } catch(e) {
    todos = []
  }
  if (todos[ctx.params.id]) {
    ctx.body = todos[ctx.params.id]
  } else {
    ctx.status = 404
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app.listen(3000);
