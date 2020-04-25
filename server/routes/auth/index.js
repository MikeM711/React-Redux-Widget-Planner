const passport = require('passport');
const router = require('express-promise-router')();

const passportConf = require('../../config/passport/passport')
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const { passportSignIn } = require('../../helpers/passportHelpers');
const UsersController = require('../../controllers/users');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/oauth/google')
  .post(passport.authenticate('google-token'), UsersController.googleOAuth);

router.route('/profile')
  .get(passport.authenticate('jwt', { session: false }), UsersController.profile);

router.route('/userwidgetcalculation')
  .post(passport.authenticate('jwt', { session: false }), UsersController.userWgtCalc);

router.route('/deletewidgetcalculation/:id')
  .delete(passport.authenticate('jwt', { session: false }), UsersController.deleteWgtCalc);

module.exports = router;