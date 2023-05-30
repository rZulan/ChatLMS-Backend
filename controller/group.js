const groupService = require('../service/group');
const SUCCESS_MESSAGE = require('../constants/success-messages');


const getGroups = async (req, res) => {
    try {
        const groups = await groupService.getGroups();

        res.json({ ...SUCCESS_MESSAGE.GENERAL_SUCCESS, data: groups });
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const getGroup = async (req, res) => {
    try {
        const id = req.params.id;
        const group = await groupService.getGroup(id);
        res.json({ ...SUCCESS_MESSAGE.GENERAL_SUCCESS, data: group });
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const createGroup = async (req, res) => {
    try {
        const createRequest = req.body.group;

        const group = await groupService.createGroup(createRequest);

        return res.json({ ...SUCCESS_MESSAGE.GENERAL_SUCCESS, data: group });
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const deleteGroup = async (req, res) => {
    try {
        const id = req.params.id
        await groupService.deleteGroup(id);
        res.json(SUCCESS_MESSAGE.GENERAL_SUCCESS);
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const updateGroup = async (req, res) => {
    try {
        const { id, updateRequest } = req.body
        await groupService.updateGroup(id, updateRequest)
        return res.json(SUCCESS_MESSAGE.GENERAL_SUCCESS)
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const addMember = async (req, res) => {
    try {
        const id = req.params.id
        const { addRequest } = req.body
        await groupService.addMember(id, addRequest)
        return res.json(SUCCESS_MESSAGE.GENERAL_SUCCESS)
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const leaveGroup = async (req, res) => {
    try {
        const id = req.params.id
        const { leaveRequest } = req.body
        await groupService.leaveGroup(id, leaveRequest)
        return res.json(SUCCESS_MESSAGE.GENERAL_SUCCESS)
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

module.exports = {
    getGroups,
    createGroup,
    deleteGroup,
    getGroup,
    updateGroup,
    addMember,
    leaveGroup
}