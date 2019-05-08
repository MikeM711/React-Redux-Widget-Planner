const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));

router.use('/widget', require('./widget'));

module.exports = router;