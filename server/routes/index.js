const express = require('express');
const router = express.Router();

router.use('/', require('./auth'));

router.use('/widget', require('./widget'));

module.exports = router;