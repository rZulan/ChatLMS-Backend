const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    students: {
        type: [],
        required: true
    },
    conversation: {
        type: [],
        required: true
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Group', groupSchema);