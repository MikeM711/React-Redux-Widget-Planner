const { widget } = require('../models')

module.exports = {
  getWidgets: async (req, res, next) => {
    try {
      console.log('inside controllers')
      const allWidgets = await widget.findAll()
      res.status(200).json({ allWidgets });
    }
    catch (err) {
      console.log('error in finding widgets')
      res.status(400).json({ err });
    }
  }
}