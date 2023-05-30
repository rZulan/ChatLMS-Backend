const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    link: {
        type: String
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Task", taskSchema)