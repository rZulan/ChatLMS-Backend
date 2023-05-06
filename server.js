require('dotenv').config();
require('./config/db-connect');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3500;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://127.0.0.1:5173", null],
        methods: ["POST", "GET"],
    }
});

// Routes
app.use('/api', require('./routes/group'));
app.use('/api', require('./routes/message'));

io.on('connection', (socket) => {

    //socket.on('join-room', (data) => socket.join(data));
    socket.on('send-message', (data) => {
        console.log(data);
        socket.broadcast.emit('room-message', data)
    });
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
})