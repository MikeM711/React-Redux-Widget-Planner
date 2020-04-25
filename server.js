const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv').config();
const models = require('./server/models');
const routes = require('./server/routes');
const passport = require('passport');

// If we are not running production, use local keys
if (!process.env.NODE_ENV) {
  var config = require('./server/config/keys');
};

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Allowed origins
const corsOptions = {
  origin: `${process.env.ALLOWED_ORIGINS}` || config.ALLOWED_ORIGINS,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// bodyparser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', routes);

// Handles any requests that do not match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (!err) {
    models.sequelize.sync()
      .then(() => {
        console.log('Database is running');
      })
      .catch((err) => {
        console.log(err, 'Something went wrong with the Database update');
      });
    console.log('Site is live');
  } else {
    console.log('err');
  };
});