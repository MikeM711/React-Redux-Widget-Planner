const express = require('express');
const models = require('./server/models')
const routes = require('./server/routes');
const passport = require('passport');
const session = require('express-session');

const app = express();

const bodyParser = require('body-parser')

// bodyparser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Session for passport

app.use(session({
  secret: 'some cookie key', // The key for our cookie session
  resave: true, // we will leave it as 'true' as per tutorial
  saveUninitialized: true,
}));

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// routes

app.get('/', (req, res) => {
  res.send('Widget Calculator backend .....  http://localhost:5000/auth/google ..... http://localhost:5000/dashboard')
  
})

app.get('/introduction', (req, res) => {
  res.send('Hello World')
})

// Use the below middleware to redirect to landing page, if the user is not authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}

app.get('/dashboard', (req, res) => {
  if(req.isAuthenticated()){
    const user = req.user
  res.send(`Your google signup was successful, hello ${user.username} `)
  } else {
    res.send ('Sorry, you are not authenticated')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  })
})

app.use('/', routes);

const PORT = process.env.PORT || 5000

app.listen(PORT, (err) => {
  if (!err) {

    models.sequelize.sync()
      .then(() => {
        console.log('Database is running')
      })
      .catch((err) => {
        console.log(err, 'Something went wrong with the Database update')
      })

    console.log('Site is live');

  } else {
    console.log('err');
  }
})
