require('dotenv').config()

const next = require('next')
const path = require('path')
const routes = require('./routes')
const port = parseInt(process.env.PORT, 10) || 3000
const socketPort = parseInt(process.env.SOCKET_PORT, 10) || 3002
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
// const handle = app.getRequestHandler()

const handle = routes.getRequestHandler(app, ({req, res, route, query}) => {
  app.render(req, res, '/', query)
  app.render(req, res, route.page, query)
})

const express = require('express')
const server = express()
// const socketServer = require('http').Server(server)
const io = require('socket.io').listen(socketPort)

let users = [100100]
let time = 0

app.prepare()
  .then(() => {
    
    io.on('connection', socket => {
      console.log('connected', users)
      socket.emit('setUser', users)
      socket.emit('getTime', time)
      socket.on('examStart', data => {
        time = data
        io.emit('examStart', {status: 'start'})
      })

      socket.on('getUser', () => {
        console.log('getUser')
        socket.emit('setUser', users)
      })

      socket.on('getTime', () => {
        socket.emit('getTime', time)
      })
      

      socket.on('finish', id => {
        let index = users.findIndex(u => u === id)
        console.log(index)
        
        if (index < 0) {
          users.push(id)
        }
        console.log(users)
        io.sockets.emit('setUser', users)
      })
      
    })

    server.get('/robot.txt', (req, res) => {
      return res.sendFile(path.join(__dirname, './static', 'robot.txt'))
    })

    server.get('/static/img/favicon/*', (req, res) => {
      return res.sendFile(path.join(__dirname, req.url))
    })
    server.use(handle)
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port} eiei`)
    })
  })
