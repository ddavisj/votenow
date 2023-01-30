const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
   done(null, user.id); // using user.id here (ie. generic id from MDB) cf using profile.id (G id below)
});

passport.deserializeUser((id, done) => {
   User.findById(id).then(user => {
      done(null, user);
   });
});

// passport.use(
//    new GoogleStrategy(
//       {
//          clientID: keys.googleClientID,
//          clientSecret: keys.googleClientSecret,
//          callbackURL: '/auth/google/callback',
//          proxy: true,
//       },
//       (accessToken, refreshToken, profile, done) => {
//          User.findOne({ googleId: profile.id }).then(existingUser => {
//             if (existingUser) {
//                // we already have a record with the given profile id
//                done(null, existingUser);
//             } else {
//                // we don't have a user record with this ID, make a new record
//                new User({ googleId: profile.id })
//                   .save()
//                   .then(user => done(null, user));
//             }
//          });
//       }
//    )
// );

// REFACTOR using async/await - FROM TUTE:

// passport.use(
//    new GoogleStrategy(
//       {
//          clientID: keys.googleClientID,
//          clientSecret: keys.googleClientSecret,
//          callbackURL: '/auth/google/callback',
//          proxy: true,
//       },
//       async (accessToken, refreshToken, profile, done) => {
//          const existingUser = await User.findOne({ googleId: profile.id });
//          if (existingUser) {
//             // we already have a record with the given profile id
//             done(null, existingUser);
//          } else {
//             // we don't have a user record with this ID, make a new record
//             const user = await new User({ googleId: profile.id }).save();
//             done(null, user);
//          }
//       }
//    )
// );

// Refactor to clean it up (removed comments and added a return to L79/removed else case):
passport.use(
   new GoogleStrategy(
      {
         clientID: keys.googleClientID,
         clientSecret: keys.googleClientSecret,
         callbackURL: '/auth/google/callback',
         proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
         const existingUser = await User.findOne({ googleId: profile.id });

         if (existingUser) {
            return done(null, existingUser);
         }

         const user = await new User({ googleId: profile.id }).save();
         done(null, user);
      }
   )
);
