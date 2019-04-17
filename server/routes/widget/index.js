const express = require('express');
// get widget models
const router = express.Router();

router.get('/greeting', (req,res) => {
  res.send('hello in widget route')
})

module.exports = router;