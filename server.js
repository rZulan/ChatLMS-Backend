require('dotenv').config();
require('./config/db-connect');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const socketIOConnection = require('./controller/message');
const cookieParse = require("cookie-parser");

const PORT = process.env.PORT || 3500;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParse());

const http = require('http');
const server = http.createServer(app);

// Routes
app.use('/api', require('./routes/group'));
app.use('/api', require('./routes/task'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/auth'));

socketIOConnection(server);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
})