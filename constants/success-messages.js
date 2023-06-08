const STATUS_CODE = require('./status-codes');

const successMessage = {
    GENERAL_SUCCESS: {
        statusCode: STATUS_CODE.SUCCESS,
        message: 'Success'
    },
    SUCCESS_LOGIN: {
        statusCode: STATUS_CODE.SUCCESS,
        message: "Successfully login"
    },
    SUCCESS_LOGOUT: {
        statusCode: STATUS_CODE.SUCCESS,
        message: "Successfully logout"
    }
}

module.exports = successMessage;