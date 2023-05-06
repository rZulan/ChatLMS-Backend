const express = require('express');
const router = express.Router();
const { getGroups, createGroup, deleteGroup, getGroup, } = require('../controller/group');

router.get('/group', getGroups);
router.post('/group', createGroup);
router.delete('/group/:id', deleteGroup);
router.get('/group/:id', getGroup);

module.exports = router;