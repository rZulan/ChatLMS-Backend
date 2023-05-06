const messageService = require('../service/message');
const SUCCESS_MESSAGE = require('../constants/success-messages');

const addMessage = async (req, res) => {
    try {
        const { id, message } = req.body;

        await messageService.addMessage(id, message);

        res.json(SUCCESS_MESSAGE.GENERAL_SUCCESS);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addMessage
}