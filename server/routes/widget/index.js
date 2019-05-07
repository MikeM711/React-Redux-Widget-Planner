
const router = require('express-promise-router')()

const WidgetsController = require('../../controllers/widgets')

router.route('/widgets')
  .get(WidgetsController.getWidgets);

router.route('/widgetPOST')
  .post(WidgetsController.addWidget)

router.route('/widgetDELETE/:id')
  .delete(WidgetsController.deleteWidget)

router.route('/widgetUPDATE')
  .put(WidgetsController.updateWidget)

module.exports = router;