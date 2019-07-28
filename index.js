const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const koaStatic = require('koa-static-prefix');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const path = require('path')
const fs = require('fs')

app.use(koaStatic(path.join(__dirname, 'static'), {pathPrefix: '/static'}))
app.use(session({
  key: 'koa:sess',
  signed: false
}, app));

/*
app.use((ctx, next) => {
  ctx.render = (file) => {
    ctx.body = fs.readFileSync(path.join(__dirname, 'views', file+".html")).toString();
  }
  next()
})
*/

app.use(bodyparser())

var router = new Router();
require('./router')(router);

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app.listen(3000);
