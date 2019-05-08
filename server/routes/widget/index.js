const passport = require('passport')
const router = require('express-promise-router')()

const WidgetsController = require('../../controllers/widgets')

router.route('/widgets')
  .get(passport.authenticate('jwt', { session: false }), WidgetsController.getWidgets);

router.route('/widgetPOST')
  .post(passport.authenticate('jwt', { session: false }), WidgetsController.addWidget)

router.route('/widgetDELETE/:id')
  .delete(passport.authenticate('jwt', { session: false }), WidgetsController.deleteWidget)

router.route('/widgetUPDATE')
  .put(passport.authenticate('jwt', { session: false }), WidgetsController.updateWidget)

module.exports = router;