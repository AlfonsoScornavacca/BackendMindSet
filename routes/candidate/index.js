const express = require('express');
const sessions = require('./sessions');

const router = express.Router();

router.use('/sessions', sessions);

module.exports = router;