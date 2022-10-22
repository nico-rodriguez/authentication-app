const { Router } = require('express');
const passport = require('passport');
const config = require('../../config');

const router = Router();

// Initiate OAuth authentication with GitHub
router.get(
  '/',
  passport.authenticate('github', {
    scope: ['read:user'],
  })
);

// Redirect to /authenticating page after successful OAuth authentication with GitHub
router.get(
  '/callback',
  passport.authenticate('github', {
    successRedirect: `${config.FRONTEND_URL}/authenticating`,
    failureRedirect: `${config.FRONTEND_URL}/authenticating`,
  })
);

module.exports = router;
