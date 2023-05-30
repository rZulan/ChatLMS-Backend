const TASK = require("../models/task")
const ERROR_MESSAGE = require("../constants/error-messages")

const getTasks = async () => {
    try {
        const tasks = await TASK.find().lean().exec()
        return tasks
    } catch (error) {
        throw error
    }
}

const getTask = async (id) => {
    try {
        if (!id) throw ERROR_MESSAGE.GENERAL_ERROR

        const task = await TASK.findById(id).lean().exec()

        if (!task) throw ERROR_MESSAGE.NOT_FOUND_ERROR

        return task
    } catch (error) {
        throw error
    }
}

const createTask = async (taskCredentials) => {
    try {
        if (!taskCredentials) throw ERROR_MESSAGE.GENERAL_ERROR

        const { name, dueDate, description, link } = taskCredentials

        if (!name || !dueDate || !description || !link) throw ERROR_MESSAGE.GENERAL_ERROR

        const findDuplicate = await TASK.findOne({ name }).lean().exec()
        if (findDuplicate) throw ERROR_MESSAGE.CONFLICT_ERROR

        const response = await TASK.create(taskCredentials)

        if (!response) throw ERROR_MESSAGE.GENERAL_ERROR

        return response
    } catch (error) {
        throw error
    }
}

const updateTask = async (id, updateRequest) => {
    try {
        if (!id || !updateRequest) throw ERROR_MESSAGE.GENERAL_ERROR

        const response = await TASK.findOneAndUpdate({ _id: id }, updateRequest, { new: true }).lean().exec()

        if (!response) throw ERROR_MESSAGE.GENERAL_ERROR

        return response
    } catch (error) {
        throw error
    }
}

const deleteTask = async (id) => {
    try {
        if (!id) throw ERROR_MESSAGE.GENERAL_ERROR

        const response = await TASK.findOneAndDelete({ _id: id }).lean().exec()

        if (!response) throw ERROR_MESSAGE.GENERAL_ERROR

        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    getTask,
    getTasks,
    createTask,
    updateTask,
    deleteTask
}
