
const ToDoController = require('./controllers/todo');

module.exports = (router) => {
  router.get('/', ToDoController.index);
  router.post('/login', ToDoController.login);
  router.get('/api/todo', ToDoController.getAll);
  router.get('/api/todo/:id', ToDoController.get);
  router.post('/api/todo', ToDoController.create);

}

