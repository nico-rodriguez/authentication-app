const { Router } = require('express');
const passport = require('passport');
const config = require('../../config');

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
    successRedirect: `${config.FRONTEND_URL}/welcome`,
    failureRedirect: config.FRONTEND_URL,
  })
);

module.exports = router;
