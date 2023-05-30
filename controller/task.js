const taskService = require("../service/task")
const SUCCESS_MESSAGE = require("../constants/success-messages")

const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks()
        return res.json({ ...SUCCESS_MESSAGE.GENERAL_SUCCESS, data: tasks })
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const getTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = await taskService.getTask(id)
        return res.json({ ...SUCCESS_MESSAGE.GENERAL_SUCCESS, data: task })
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const createTask = async (req, res) => {
    try {
        const { createRequest } = req.body
        const task = await taskService.createTask(createRequest)
        return res.json({ ...SUCCESS_MESSAGE.GENERAL_SUCCESS, data: task })
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id
        const { updateRequest } = req.body
        const task = await taskService.updateTask(id, updateRequest)
        return res.json({ ...SUCCESS_MESSAGE.GENERAL_SUCCESS, data: task })
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = await taskService.deleteTask(id)
        return res.json({ ...SUCCESS_MESSAGE.GENERAL_SUCCESS, data: task })
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

module.exports = {
    getTask,
    getTasks,
    deleteTask,
    updateTask,
    createTask
}
