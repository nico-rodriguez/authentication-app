const { Router } = require('express');
const config = require('../../config');

const router = Router();

router.get('/', (req, res) => {
  req.logout();
  req.session.destroy();
  res.clearCookie('sessionId').redirect(`${config.FRONTEND_URL}/login`);
});

module.exports = router;
