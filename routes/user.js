const express = require("express");
const { userRegister, getUsers } = require("../controller/user");
const router = express.Router();

router.post("/user", userRegister);
router.get("/user", getUsers);

module.exports = router;