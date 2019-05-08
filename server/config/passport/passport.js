const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const bCrypt = require('bcryptjs');
const { user } = require('../../models')

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: `${process.env.JWT_SECRET}`
}, (payload, done) => {

  // Find the users specified in token
  user.findOne({
    where: {
      id: payload.sub
    }
  })
    .then(DBuser => {
      // if user doesn't exist, handle it
      if (!DBuser) {
        return done(null, false);
      }

      // Otherwise, return the user
      if (DBuser) {
        return done(null, user);
      }
    })
    .catch(err => {
      console.log('Error: ', err)
      done(error, false);
    })
}));

const clientIdKey = process.env.GOOGLE_CLIENT_KEY
const clientSecretKey = process.env.GOOGLE_SECRET_KEY

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: `${clientIdKey}`,
  clientSecret: `${clientSecretKey}`
}, (accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken)
  console.log('refreshToken', refreshToken)
  console.log('profile', profile)

  // Check whether this current user exists in the database
  user.findOne({
    where: {
      googleId: profile.id
    }
  })
    .then(existingUser => {
      if (existingUser) {
        console.log('user already exists in database')
        /* This Google user is signing in
          Don't add them to the database, but still allow them to continue to the next middleware (the GoogleOAuth "controller"), to create a token
            That token will be used to access private routes
            When 2nd param of done() is defined, we are considered "successful"
        */
        return done(null, existingUser)
      }

      // If new account - put them in the DB
      const newUser = {
        method: 'google',
        googleId: profile.id,
        googleEmail: profile.emails[0].value
      }

      user.create(newUser)
        .then(DBuser => {
          console.log("user doesn't exist in the database")
          /* This Google user is signing up
            We will add the user to the database and allow them to continue to the next middleware (the GoogleOAuth "controller"), to create a token
            That token will be used to access private routes
            When 2nd param of done() is defined, we are considered "successful"
        */
          return done(null, DBuser)
        })
        .catch(err => {
          done(err, false, err.message)
        })

    })
    .catch(err => {
      done(err, false, err.message)
    })

}))

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {

  // Convert the email to lowercase, we made sure that the DB only accepts lowercase emails
  const emailLC = email.toLowerCase()

  // compare plain text password with hashed password
  var isValidPassword = function (userpass, password) {
    return bCrypt.compareSync(password, userpass);
  }

  // Find the user, given the email
  user.findOne({
    where: {
      email: emailLC
    }
  })
    .then(currUser => {
      // If user doesn't exist, handle it
      if (!currUser) {
        console.log('user is not found in DB')
        return done(null, false, 'This user does not exist in the database')
      }

      // Check if the password is correct

      // If password is not correct, handle it
      if (!isValidPassword(currUser.password, password)) {
        // no errors, but you won't get the user object, because the password isn't correct
        return done(null, false, 'Password is incorrect');
      }

      // Otherwise, return the user that the client has asked for
      done(null, currUser)

    })
    .catch(err => {
      console.log('User not found in DB', err)
      done(err, false)
    })

}))