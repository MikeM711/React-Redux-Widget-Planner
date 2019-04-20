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

router.put('/widgetUPDATE', (req,res) => {

  const { id, name, alum, crSteel, galv, glass, sSteel } = req.body.updatedWidget

  const updateData = {
    name: name,
    aluminum: alum,
    cold_rolled_steel: crSteel,
    galvanneal: galv,
    glass: glass,
    stainless_steel: sSteel
  }

  widget.update(updateData, {
    where: {id}
  })
    .then(([result]) => {
      // some security to make sure we only updated one row
      if (result === 1) {
        // return the widget row we have updated
        return widget.findOne({
          where: {id}
        })
      }
    })
    .then((data) => {
      res.status(200).json({ data: data.dataValues });
    })
    .catch((err) => {
      console.log("Error in updating the database")
      es.status(400).json({ err });
    })


})

module.exports = router;