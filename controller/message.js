const messageService = require('../service/message');
const ERROR_MESSAGE = require('../constants/error-messages');
const { Server } = require('socket.io');


const socketIOConnection = async (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", null],
            methods: ["POST", "GET"],
        }
    });

    io.on('connection', (socket) => {
        socket.on('join-room', (data) => socket.join(data));

        socket.on('disconnect', () => console.log('disconnected'));

        socket.on('send-message', async (data) => {
            try {
                await addMessage(data);
            } catch (error) {
                return socket.emit('unsuccessfull', ERROR_MESSAGE.GENERAL_ERROR);
            }
            socket.to(data.id).emit('room-message', data);
        });
    });
}


const addMessage = async (data) => {
    try {
        const { id, message } = data;

        await messageService.addMessage(id, message);
    } catch (error) {
        throw error;
    }
}

module.exports = socketIOConnection