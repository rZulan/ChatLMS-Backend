const express = require("express");
const { login, logout, refresh } = require("../controller/auth");
const router = express.Router();

router.post("/auth", login);
router.post("/auth/logout", logout);
router.get("/auth/refresh", refresh);

module.exports = router;