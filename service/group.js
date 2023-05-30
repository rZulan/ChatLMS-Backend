const GROUP = require('../models/group');
const ERROR_MESSAGE = require('../constants/error-messages');


const getGroups = async () => {
    try {
        const groups = await GROUP.find().lean().exec();
        return groups;
    } catch (error) {
        throw error;
    }
}

const getGroup = async (id) => {
    try {
        if (!id) throw ERROR_MESSAGE.GENERAL_ERROR;

        const group = await GROUP.findById(id).lean();

        if (!group) throw ERROR_MESSAGE.GENERAL_ERROR;

        return group;
    } catch (error) {
        throw error
    }
}

const createGroup = async (group) => {
    try {

        if (!group) throw ERROR_MESSAGE.GENERAL_ERROR;

        const { name, instructor } = group;

        if (!name || !instructor) throw ERROR_MESSAGE.GENERAL_ERROR;

        const findDuplicate = await GROUP.findOne({ name }).lean();

        if (findDuplicate) throw ERROR_MESSAGE.CONFLICT_ERROR;

        const response = await GROUP.create(group);

        if (!response) throw ERROR_MESSAGE.GENERAL_ERROR;

        return response;

    } catch (error) {
        throw error;
    }
}

const deleteGroup = async (id) => {
    try {
        if (!id) throw ERROR_MESSAGE.GENERAL_ERROR;

        const foundGroup = await GROUP.findById(id).exec();

        if (!foundGroup) throw ERROR_MESSAGE.GENERAL_ERROR;

        const response = await foundGroup.deleteOne();

        if (!response) throw ERROR_MESSAGE.GENERAL_ERROR;

        return response;
    } catch (error) {
        throw error;
    }
}

const updateGroup = async (id, updateRequest) => {
    try {
        if (!id || !updateRequest) throw ERROR_MESSAGE.GENERAL_ERROR

        const response = await GROUP.findOneAndUpdate({ _id: id }, updateRequest).lean().exec()

        if (!response) throw ERROR_MESSAGE.GENERAL_ERROR

        return response

    } catch (error) {
        throw error
    }
}

const addMember = async (id, name) => {
    try {
        if (!name || !id) return ERROR_MESSAGE.GENERAL_ERROR

        const findGroup = await GROUP.findById(id).exec()

        if (!findGroup) return ERROR_MESSAGE.NOT_FOUND_ERROR

        findGroup.students.push(name)
        const response = await findGroup.save()

        if (!response) return ERROR_MESSAGE.GENERAL_ERROR

        return response

    } catch (error) {
        throw error
    }
}

const leaveGroup = async (id, name) => {
    try {
        if (!name || !id) return ERROR_MESSAGE.GENERAL_ERROR

        const findGroup = await GROUP.findById(id).exec()

        if (!findGroup) return ERROR_MESSAGE.NOT_FOUND_ERROR

        findGroup.students = findGroup.students.filter(studentName => name !== studentName)
        const response = await findGroup.save()

        if (!response) return ERROR_MESSAGE.GENERAL_ERROR

        return response

    } catch (error) {
        throw error
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