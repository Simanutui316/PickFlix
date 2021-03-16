const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
//Require your User Model here!

// configuring Passport!
// This gets called at initial login
console.log(process.env.GOOGLE_CLIENT_ID, 'this is google client ID')
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},

  function (accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    console.log(profile, "<----- Profile")
    // Fetch the User from the database and provide them back to passport 
    User.findOne({ 'googleId': profile.id }, function (err, user) {
      if (err) return cb(err);

      if (user) {

        // cb(error, documentFromMongoose)
        return cb(null, user);
      } else {
        // if we didn't find the User(user) go ahead create them
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        })

        // save it 
        newUser.save(function (err) {
          if (err) return cb(err);
          return cb(null, newUser)
        })
      }
    })

  }
));

// This puts the user ID in the session cookie
passport.serializeUser(function (userDocument, done) {
  done(null, userDocument.id);
});

//decrypting the cookie
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);// this assings our student document to req.user, which we can use 
  })
});
  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user