const authService = require("../service/auth");
const SUCCESS_MESSAGE = require("../constants/success-messages");
const ERROR_MESSAGE = require("../constants/error-messages");
const jwt = require("jsonwebtoken");
const USER = require("../models/user");


const login = async (req, res) => {
    try {
        const { userCredentials } = req.body;
        if (!userCredentials) throw ERROR_MESSAGE.GENERAL_ERROR;
        const user = await authService.login(userCredentials);
        if (!user) throw ERROR_MESSAGE.UNAUTHORIZED_ERROR;

        const accessToken = jwt.sign({
            "UserInfo": {
                username: user.username,
                role: user.role
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: true, //https
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })

        return res.json({ ...SUCCESS_MESSAGE.SUCCESS_LOGIN, accessToken: accessToken });
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

const refresh = (req, res) => {
    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.json({ ...ERROR_MESSAGE.UNAUTHORIZED_ERROR });

        const refreshToken = cookies.jwt;

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({ message: 'Forbidden' })

                const foundUser = await USER.findOne({ username: decoded.username }).exec()

                if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "username": foundUser.username,
                            "role": foundUser.role
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                )

                res.json({ accessToken })
            }
        )
    } catch (error) {
        res.json({ ...ERROR_MESSAGE.GENERAL_ERROR })
    }
}

const logout = async (req, res) => {
    try {
        const cookie = req.cookies;
        if (!cookie?.jwt) return res.json({ ...SUCCESS_MESSAGE.SUCCESS_LOGOUT });
        res.clearCookie("jwt", { httpOnly: true, samesSite: "None", });
        res.json({ ...SUCCESS_MESSAGE.SUCCESS_LOGOUT, data: "Cookie Cleared!" })
    } catch (error) {
        if (error.message) res.json(error);
        console.log(error);
    }
}

module.exports = {
    login,
    logout,
    refresh
}