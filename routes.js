const nextRoutes = require('next-routes')
const routes = (module.exports = nextRoutes())

routes.add('register', '/register')
routes.add('question/answer', '/question/answer/:id')
