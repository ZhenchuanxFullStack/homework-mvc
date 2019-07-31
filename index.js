const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const koaStatic = require('koa-static-prefix');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const path = require('path');

app.use(koaStatic(path.join(__dirname, 'static'), {pathPrefix: '/static'}))

app.use(bodyparser())

app.use(session({
  key: 'koa:sess',
  signed: false
}, app));

var router = new Router();
require('./routers/todo')(router);

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app.listen(4000);
