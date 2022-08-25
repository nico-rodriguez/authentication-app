const { Router } = require('express');
const passport = require('passport');

const router = Router();

// Initiate OAuth authentication with Google
router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

//Redirect to profile page after successful OAuth authentication with Google
router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/profile',
    failureRedirect: 'http://localhost:3000',
  })
);

module.exports = router;
