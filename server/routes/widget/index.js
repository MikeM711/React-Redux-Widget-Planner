
const router = require('express-promise-router')()

const { widget } = require('../../models')
const WidgetsController = require('../../controllers/widgets')

router.route('/widgets')
  .get(WidgetsController.getWidgets);

router.post('/widgetPOST', async (req, res) => {
  try {
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
    const newWidgetRes = await widget.create(data)
    console.log(newWidgetRes, 'successfully added')
    // send data to the frontend
    res.status(200).json({ data: newWidgetRes.dataValues });
  }
  catch (err) {
    console.log(err, "widget was not successfully added to DB")
    res.status(400).json({ err });
  }

})

router.delete('/widgetDELETE/:id', async (req, res) => {
  try {
    const { id } = req.params
    const delWidgetRes = await widget.destroy({ where: { id } })
    // make sure only one widget was deleted
    if (delWidgetRes === 1) {
      // end successful connection
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ err: 'Database did not delete correctly' })
    }
  }
  catch (err) {
    res.status(400).json({ err });
  }
})

router.put('/widgetUPDATE', async (req, res) => {
  try {
    const { id, name, alum, crSteel, galv, glass, sSteel } = req.body.updatedWidget
    const updateData = {
      name: name,
      aluminum: alum,
      cold_rolled_steel: crSteel,
      galvanneal: galv,
      glass: glass,
      stainless_steel: sSteel
    }
    const upWidgetResArr = await widget.update(updateData, { where: { id } })
    // some security to make sure we only updated one row
    if (upWidgetResArr.length === 1) {
      // return the widget row we have updated
      const updatedWidget = await widget.findOne({ where: { id } })
      res.status(200).json({ data: updatedWidget.dataValues });
    }
  }
  catch (err) {
    console.log("Error in updating the database")
    res.status(400).json({ err });
  }
})

module.exports = router;