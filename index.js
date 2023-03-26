const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

// const path = require('path');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); // provides req.body property
app.use(
   cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey],
   })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // end of T31
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'prod') {
   // Express will serve up prodn assets
   // like our main.js or main.css files
   // app.use(express.static('client/build')); // Commented this as got an error..
   const path = require('path');

   app.use(express.static(path.join(__dirname, 'client/build')));

   // Express will serve up the index.html file
   // if it doesn't recognise the route
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
