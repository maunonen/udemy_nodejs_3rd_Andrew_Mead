const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')


const app = express()
// using express with socket io 
const server =  http.createServer(app)
// socketio as function and pass in a server  
// socket io run with raw http server 
const io = socketio(server)

const port = process.env.PORT || 3000

// __dirname - current directory for fthis file 
const publicPath =  path.join(__dirname, '../public')

app.use(express.static(publicPath))
//let count = 0



io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    // send event to client from server 'countUpdated'
    //socket.emit('countUpdated', count)
    // Send message to the client 
    socket.emit('message', 'Welcome')

    // broadcast - send to everybady except cuurent user
    socket.broadcast.emit('message', 'A new user has joined')
    
    // get event from client 'increment' and increment value and send it back to the client 
/*     socket.on('increment', () => {
        count ++
        // in this case we just emit to particular connection 
        // socket.emit('countUpdated', count)

        // in this case we emit to all connection 
        io.emit('countUpdated', count)
    }) */

    socket.on('messageCLient', (message, callback) => {

        const filter = new Filter()
        if (filter.isProfane(message)) {
            // return the error on the client 
            return callback('Profanity is not allowed')
        }
        io.emit('messageServer', message)
        // sent acknowledgemnet to the client by call a callback function 
        callback('Delivered')
    })

    socket.on('sendLocation', (location, callback)=> {
        io.emit('message', `https://www.google.com/maps/?q=${location.latitude},${location.longitude}`) 
        callback()
    })

    socket.on('disconnect', ()=> {
        io.emit('message', 'A user has left')
    })

})

// change app to server 
server.listen(port, () => {
    console.log(`Listen on port ${port}`)
})
