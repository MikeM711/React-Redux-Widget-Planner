const JWT = require('jsonwebtoken');
const bCrypt = require('bcryptjs');
const { user, widget_calculation } = require('../models');

signToken = user => {
  return JWT.sign({
    iss: 'Michael',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, `${process.env.JWT_SECRET}`);
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;
    // Convert the email to lowercase - the database only accepts lowercase emails, as per our model
    const emailLC = email.toLowerCase();
    // Generate salt and hash
    var generateHash = function (password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    var userPassword = generateHash(password);
    const newUser = {
      method: 'local',
      email: emailLC,
      password: userPassword,
    };
    // Check to see if the user that is signing up has an email that is already in the database
    user.findOne({
      where: {
        email: newUser.email
      }
    })
      .then((DBUser) => {
        // If the email exists
        if (DBUser) {
          // status 403 = forbidden
          res.status(403).json({ error: "This email is taken" });
        } else {
          // If the email does not exist, create that user
          user.create(newUser)
            .then((user) => {
              console.log(user, "User successfully added to the database");
              // Generate the token
              const token = signToken(user);
              res.status(200).json({ token });
            })
            .catch((err) => {
              console.log(err, "User was not successfully added to the database");
              // Execution shouldn't land here, but just in case
              const clientErr = "User was not successfully added to the database - Please Handle";
              res.status(400).json({ clientErr });
            })
        };
      })
  },

  signIn: async (req, res, next) => {
    // Generate Token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    // Generate Token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  profile: async (req, res, next) => {
    try {
      let profile = {};
      if (req.user.dataValues.googleName) {
        profile.name = req.user.dataValues.googleName;
      } else if (req.user.dataValues.email) {
        profile.name = req.user.dataValues.email;
      };
      const userId = req.user.dataValues.id;
      // Find the calculations by the user
      const userCalcs = await widget_calculation.findAll({
        where: {
          userId
        }
      })
      profile.userCalcs = userCalcs;
      res.json({ profile });
    }
    catch (err) {
      console.log('Error in fetching profile', err);
    };
  },

  userWgtCalc: async (req, res, next) => {
    try {
      const userId = req.user.dataValues.id;
      const data = {
        calculation: req.body.userHistory,
        calculation_total: req.body.userHistTotal,
        userId
      };
      const newWgtCalc = await widget_calculation.create(data);
      res.json({ newWgtCalc: newWgtCalc.dataValues });
    }
    catch (err) {
      console.log('Error in retrieving calculations:', err);
    };
  },

  deleteWgtCalc: async (req, res, next) => {
    try {
      const { id } = req.params;
      const delWidgetCalcRes = await widget_calculation.destroy({ where: { id } });
      if (delWidgetCalcRes === 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ err: 'Database did not delete correctly' })
      };
    }
    catch (err) {
      console.log('err', err);
    };
  }
};