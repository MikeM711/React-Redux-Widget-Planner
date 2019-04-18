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

router.post('/widgetPOST', (req, res) => {

  const { newWidget } = req.body
  // Hard-coded widget sent to database
  const data = {
    name: newWidget.name,
    aluminum: newWidget.alum,
    cold_rolled_steel: newWidget.crSteel,
    galvanneal: newWidget.galv,
    glass: newWidget.glass,
    stainless_steel: newWidget.sSteel
  }

  widget.create(data)
    .then((widget) => {
      console.log(widget, 'successfully added')
      // send data to the frontend
      res.status(200).json({ data: widget.dataValues });
    })
    .catch((err) => {
      console.log(err, "widget was not successfully added to DB")
      // send error to the frontend
      res.status(400).json({ error });
    })
})

router.delete('/widgetDELETE/:id', (req,res) => {
  const { id } = req.params

  widget.destroy({
    where:{
      id
    }
  })
    .then((result) => {
      // make sure only one widget was deleted
      if (result === 1) {
        // end successful connection
        res.status(200).json({ success: true });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
})

module.exports = router;