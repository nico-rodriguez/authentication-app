const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  req.logout();
  req.session.destroy();
  res.clearCookie('sessionId').redirect('http://localhost:3000/login');
});

module.exports = router;
