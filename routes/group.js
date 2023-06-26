const express = require('express');
const router = express.Router();
const { getGroups, createGroup, deleteGroup, getGroup, updateGroup, addMember, leaveMember, leaveGroup, } = require('../controller/group');
const verifyJWT = require("../middleware/jwtVerify");

router.get('/group', verifyJWT, getGroups);
router.post('/group', createGroup);
router.delete('/group/:id', deleteGroup);
router.get('/group/:id', getGroup);
router.patch('/group', updateGroup);
router.patch('/group/add/:id', addMember);
router.patch('/group/leave/:id', leaveGroup);

module.exports = router;