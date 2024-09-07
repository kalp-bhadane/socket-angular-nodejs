const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');   
 // Replace with your client-side origin
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add allowed headers if needed
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
    next();
});

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);


const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})

io.on('connection', (socket) => {
    console.log(`Socket Connected`);
    // socket.on('join', (data) => {
    //     socket.join(data.room);
    //     socket.broadcast.to(data.room).emit('user joined');
    // })
    socket.on('message', (data) => {
        socket.broadcast.emit('new message', data)
        // io.in(data.room).emit('new message', { user: data.user, message: data.message });
    })
})