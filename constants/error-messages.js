const STATUS_CODE = require('./status-codes');

const errorMessages = {
    CONFLICT_ERROR: {
        statusCode: STATUS_CODE.CONFLICT,
        message: 'Data Already Exist'
    },
    GENERAL_ERROR: {
        statusCode: STATUS_CODE.BAD_REQUEST,
        message: 'Something went wrong'
    }
}

module.exports = errorMessages;