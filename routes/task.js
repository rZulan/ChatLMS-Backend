const express = require("express")
const { getTasks, getTask, updateTask, deleteTask, createTask } = require("../controller/task")
const router = express.Router()

router.get("/task", getTasks)
router.get("/task/:id", getTask)
router.patch("/task/:id", updateTask)
router.delete("/task/:id", deleteTask)
router.post("/task", createTask)

module.exports = router