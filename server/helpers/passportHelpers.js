const passport = require('passport');

module.exports = {
  passportSignIn: function (req, res, next) {
    return passport.authenticate('local', {
      session: false
    }, function (err, user, info) {
      // We will attach the 'user' object to req.user, which we will receive inside the UsersController middleware
      req.user = user;
      if (err) {
        return next(err);
      };
      // If user is not found using client's form input, send a response about why it is incorrect
      if (!user) {
        return res.status(401).send({ message: info });
      };
      return next();
    })(req, res, next);
  }
};