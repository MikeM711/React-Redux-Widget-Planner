const JWT = require('jsonwebtoken');
const bCrypt = require('bcryptjs');
const { user } = require('../models')

signToken = user => {
  return JWT.sign({
    iss: 'Michael',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, `${process.env.JWT_SECRET}`);
}

module.exports = {
  signUp: async (req, res, next) => {
    // All data: req.value.body

    const { email, password } = req.value.body

    // Convert the email to lowercase, we made sure that the DB only accepts lowercase emails
    const emailLC = email.toLowerCase()

    // Generate salt and hash
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

    var userPassword = generateHash(password);

    const newUser = {
      method: 'local',
      email: emailLC,
      password: userPassword,
    }

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
          // For a user that already exists, I think HTTP status code of 409(Conflict) matches better
          res.status(403).json({ error: "This email is taken" });
        } else {

          // If the email does not exist, create that user
          user.create(newUser)
            .then((user) => {
              console.log(user, "successfully added")

              // Generate the token
              const token = signToken(user)
              res.status(200).json({ token: token })

            })
            .catch((err) => {
              console.log(err, "not successfully added to the database")
              // Execution shouldn't land here, but just in case
              const clientErr = "User was not successfully added to the database - Please Handle"
              res.status(400).json({ clientErr });
            })
        }
      })

  },

  signIn: async (req, res, next) => {
    // Generate Token
    console.log(req.user)
    console.log('complete')
    const token = signToken(req.user)
    res.status(200).json({ token })
  },

  googleOAuth: async (req, res, next) => {
    // Generate Token
    console.log('google req.user value', req.user)
    const token = signToken(req.user)
    res.status(200).json({ token })
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!')
    res.json({ secret: "resource" })
  },
}