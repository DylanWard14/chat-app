const http = require('http');
const express = require ('express');
const path = require ('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath));

let welcomeMessage = "Welcome!";

io.on('connection', (socket) => {
    console.log('new websocket connection')

    socket.emit('message', welcomeMessage);
    socket.broadcast.emit('message', "A new user has joined!")

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.on('sendLocation', (coordinates) => {
        io.emit('message', `https://google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`);
    })

    socket.on('disconnect', () => {
        io.emit('message', "A user has left!");
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})