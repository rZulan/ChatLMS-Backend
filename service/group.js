const GROUP = require('../models/group');
const ERROR_MESSAGE = require('../constants/error-messages');


const getGroups = async () => {
    try {
        const groups = await GROUP.find({}, { name: 1, _id: 1, }).lean();
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



module.exports = {
    getGroups,
    createGroup,
    deleteGroup,
    getGroup
}