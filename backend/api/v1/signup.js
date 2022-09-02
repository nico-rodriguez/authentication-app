const { Router } = require('express');
const passport = require('passport');

const User = require('../../models/User.js');

const router = Router();

router.post(
  '/',
  async function (req, res, next) {
    const { email, password } = req.body;
    await User.register(new User({ email }), password);
    next();
  },
  passport.authenticate('local'),
  (req, res, next) => {
    // send the response together with the session cookie
    res.sendStatus(200);
  }
);

module.exports = router;
