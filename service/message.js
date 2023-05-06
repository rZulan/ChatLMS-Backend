const GROUP = require('../models/group');
const ERROR_MESSAGE = require('../constants/error-messages');

const addMessage = async (id, message) => {
    try {
        if (!id || !message) throw ERROR_MESSAGE.GENERAL_ERROR;

        const findGroup = await GROUP.findById(id).exec();

        if (!findGroup) throw ERROR_MESSAGE.GENERAL_ERROR;

        findGroup.conversation.push(message);

        const response = await findGroup.save();

        if (!response) throw ERROR_MESSAGE.GENERAL_ERROR;

        return response;
    } catch (error) {
        throw error
    }
}

module.exports = {
    addMessage
}