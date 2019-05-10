const passport = require('passport');
const router = require('express-promise-router')()
const passportConf = require('../../config/passport/passport')

const { validateBody, schemas } = require('../../helpers/routeHelpers');
const UsersController = require('../../controllers/users');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema),

    function (req, res, next) {
      return passport.authenticate('local', {
        session: false
      }, function (err, user, info) {

        // We will attach the 'user' object to req.user, which we will receive inside the UsersController middleware
        req.user = user

        if (err) {
          return next(err);
        }

        // If user is not found using client's form input, send a response about why it is incorrect
        if (!user) {
          return res.status(401).send({ message: info });
        }

        return next();
      })(req, res, next)
    },

    UsersController.signIn);

router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

router.route('/secret')
  .get(passport.authenticate('jwt', { session: false }), UsersController.secret)

router.route('/profile')
  .get(passport.authenticate('jwt', { session: false }), UsersController.profile);

router.route('/userwidgetcalculation')
  .post(passport.authenticate('jwt', { session: false }), UsersController.userWgtCalc);

module.exports = router;