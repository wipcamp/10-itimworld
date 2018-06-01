require('dotenv').config()

const next = require('next')
const path = require('path')
const routes = require('./routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// const handle = routes.getRequestHandler(app, ({req, res, route, query}) => {
  // app.render(req, res, '/', query)
  // app.render(req, res, route.page, query)
// })

const express = require('express')
const server = express()
const socketServer = require('http').Server(server)
const io = require('socket.io')(socketServer)

app.prepare()
  .then(() => {
    io.on('connection', socket => {
      socket.on('examStart', data => {
        io.emit('examStart', {status: 'start'})
      })
    })

    server.get('/robot.txt', (req, res) => {
      return res.sendFile(path.join(__dirname, './static', 'robot.txt'))
    })

    server.get('/static/img/favicon/*', (req, res) => {
      return res.sendFile(path.join(__dirname, req.url))
    })
    // server.use(handle)
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    socketServer.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port} eiei`)
    })
  })
