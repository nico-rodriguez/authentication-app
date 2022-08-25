const { Router } = require('express');

const User = require('../../models/User.js');

const router = Router();

router.post('/', async function (req, res) {
  const { email, password } = req.body;
  await User.register(new User({ email }), password);
  res.sendStatus(200);
});

module.exports = router;
