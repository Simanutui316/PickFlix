let router = require('express').Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function (req, res) {
  res.render('home');
  // Where do you want to go for the root route
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/flix', // where do you want the client to go after you login 
    failureRedirect: '/users' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;