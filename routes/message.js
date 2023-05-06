const express = require('express');
const router = express.Router();
const { addMessage } = require('../controller/message');

router.post('/message', addMessage);

module.exports = router;