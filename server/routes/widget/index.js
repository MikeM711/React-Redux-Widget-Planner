const express = require('express');
const { widget } = require('../../models')
const router = express.Router();

router.get('/greeting', (req, res) => {
  res.send('hello in widget route')
})

router.get('/widgets', (req, res) => {
  widget.findAll()
    .then((widgets) => {
      res.status(200).json({ widgets });
    })
    .catch((err) => {
      res.status(400).json({ err });
    })
})

// Visit below URL to add a widget to DB
router.get('/widgetPOST', (req, res) => {

  // Hard-coded widget sent to database
  const data = {
    name: 'Widget B',
    aluminum: 5,
    cold_rolled_steel: 5,
    galvanneal: 5,
    glass: 5,
    stainless_steel: 0
  }

  widget.create(data)
    .then((widget) => {
      console.log(widget, 'successfully added')
    })
    .catch((err) => {
      console.log(err, "widget was not successfully added to DB")
    })
})

module.exports = router;