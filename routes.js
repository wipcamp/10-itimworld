const routes = module.exports = require('next-routes')()

routes.add('index', '/')
routes.add('register', '/register')
routes.add('question/answer', '/question/answer/:id')
