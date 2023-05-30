require('dotenv').config();
require('./config/db-connect');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const socketIOConnection = require('./controller/message')

const PORT = process.env.PORT || 3500;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const http = require('http');
const server = http.createServer(app);

// Routes
app.use('/api', require('./routes/group'));
app.use('/api', require('./routes/task'));

socketIOConnection(server);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
})