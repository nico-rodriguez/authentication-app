const { Router } = require('express');
const passport = require('passport');

const router = Router();

// Initiate OAuth authentication with GitHub
router.get(
  '/',
  passport.authenticate('github', {
    scope: ['read:user'],
  })
);

//Redirect to profile page after successful OAuth authentication with GitHub
router.get(
  '/callback',
  passport.authenticate('github', {
    successRedirect: 'http://localhost:3000/profile',
    failureRedirect: 'http://localhost:3000',
  })
);

module.exports = router;
