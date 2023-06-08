const USER = require("../models/user");
const ERROR_MESSAGE = require("../constants/error-messages");
const bcrypt = require("bcrypt");

const getUsers = async () => {
    try {
        const users = await USER.find().lean().exec();
        return users;
    } catch (err) {
        throw err
    }
}

const registerUser = async (userCredentials) => {
    try {
        const {
            firstName,
            lastName,
            username,
            password,
            email,
            role
        } = userCredentials;

        const duplicate = await USER.findOne({ username: username }).lean().exec();
        if (duplicate) throw ERROR_MESSAGE.CONFLICT_ERROR;

        const duplicateEmail = await USER.findOne({ email: email }).lean().exec();
        if (duplicateEmail) throw ERROR_MESSAGE.CONFLICT_ERROR;


        const hashPassword = await bcrypt.hash(password, 10);

        const response = await USER.create({ ...userCredentials, password: hashPassword });

        if (!response) throw ERROR_MESSAGE.GENERAL_ERROR;

        return response
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
    getUsers
}