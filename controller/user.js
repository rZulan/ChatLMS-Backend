const authService = require("../service/user");
const SUCCESS_MESSAGE = require("../constants/success-messages");
const ERROR_MESSAGE = require("../constants/error-messages");
const { validateSignup } = require("../utils/user-validation");

const getUsers = async (req, res) => {
    try {
        const users = await authService.getUsers();
        return res.json({ ...SUCCESS_MESSAGE.GENERAL_SUCCESS, data: users });
    } catch (error) {
        if (error.message) return res.json(error);

    }
}

const userRegister = async (req, res) => {
    try {
        const { userCredentials } = req.body;

        // const { error, value } = validateSignup(userCredentials);

        // if (error) throw { ...ERROR_MESSAGE.GENERAL_ERROR, error: error.message };

        const registeredUser = await authService.registerUser(userCredentials);
        console.log(registeredUser);
        if (!registeredUser) throw ERROR_MESSAGE.GENERAL_ERROR;

        return res.json({ ...SUCCESS_MESSAGE.GENERAL_SUCCESS, data: registeredUser });
    } catch (error) {
        if (error.message) return res.json(error);

    }
}

module.exports = {
    userRegister,
    getUsers
}