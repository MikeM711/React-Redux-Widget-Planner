const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const bCrypt = require('bcryptjs');
const { user } = require('../../models');

// If we are not running production, use local keys
if (!process.env.NODE_ENV) {
  var config = require('../keys');
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: `${process.env.JWT_SECRET}` || config.JWT_SECRET
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
      };
      // Otherwise, return the user
      if (DBuser) {
        return done(null, DBuser);
      };
    })
    .catch(err => {
      console.log('Error: ', err);
      done(error, false);
    });
}));

const clientIdKey = process.env.GOOGLE_CLIENT_KEY;
const clientSecretKey = process.env.GOOGLE_SECRET_KEY;


// GOOGLE OAUTH TOKEN STRATEGY
passport.use(new GoogleTokenStrategy({
  clientID: `${clientIdKey}` || config.google.clientID,
  clientSecret: `${clientSecretKey}` || config.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  // Check whether this current user exists in the database
  user.findOne({
    where: {
      googleId: profile.id
    }
  })
    .then(existingUser => {
      if (existingUser) {
        console.log('This user already exists in database');
        // This Google user is signing in, allow them to continue
        return done(null, existingUser);
      }
      const googleName = `${profile.name.givenName} ${profile.name.familyName}`;
      // If new account - put them in the database
      const newUser = {
        method: 'google',
        googleId: profile.id,
        googleEmail: profile.emails[0].value,
        googleName: googleName
      };
      user.create(newUser)
        .then(DBuser => {
          console.log("This user doesn't exist in the database");
          // This Google user is signing up, allow them to continue
          return done(null, DBuser);
        })
        .catch(err => {
          done(err, false, err.message);
        });
    })
    .catch(err => {
      done(err, false, err.message);
    })
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  // Convert the email to lowercase - the database only accepts lowercase emails, as per our model
  const emailLC = email.toLowerCase();
  // compare plain text password with hashed password
  var isValidPassword = function (userpass, password) {
    return bCrypt.compareSync(password, userpass);
  };
  // Find the user, given the email
  user.findOne({
    where: {
      email: emailLC
    }
  })
    .then(currUser => {
      // If user doesn't exist, handle it
      if (!currUser) {
        console.log('user is not found in DB');
        return done(null, false, 'This user does not exist in the database');
      };
      // Check if the password is correct

      // If password is not correct, handle it
      if (!isValidPassword(currUser.password, password)) {
        return done(null, false, 'Password is incorrect');
      }
      // Otherwise, return the user that the client has asked for
      done(null, currUser);

    })
    .catch(err => {
      console.log('User not found in DB', err);
      done(err, false);
    });
}));