const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connection Established'))
    .catch((err) => console.log(err));