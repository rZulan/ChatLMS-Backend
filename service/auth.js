const USER = require("../models/user");
const ERROR_MESSAGE = require('../constants/error-messages');
const SUCCESS_MESSAGE = require("../constants/success-messages");
const bcrypt = require("bcrypt");

const login = async (userCredentials) => {
    try {
        const { email, password } = userCredentials;

        if (!email || !password) throw ERROR_MESSAGE.GENERAL_ERROR;

        const user = await USER.findOne({ email: email }).lean().exec();

        if (!user) throw ERROR_MESSAGE.UNAUTHORIZED_ERROR;

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw ERROR_MESSAGE.UNAUTHORIZED_ERROR;

        return user;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    login,
}