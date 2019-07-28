const ToDoController = require('../controllers/todo');

module.exports = (router) => {
  router.get('/', ToDoController.indexPage)
  router.post('/login', ToDoController.login)
  router.post('/api/todo', ToDoController.create)
  router.get('/api/todo', ToDoController.getAll)
  router.get('/api/todo/:id', ToDoController.get)
}
