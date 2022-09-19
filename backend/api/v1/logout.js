const { Router } = require('express');
const config = require('../../config');

const router = Router();

router.get('/', (req, res) => {
  req.logout();
  req.session.destroy();
  res
    .clearCookie('sessionId', {
      httpOnly: true,
      sameSite: config.NODE_ENV === 'production' ? 'none' : 'strict',
      secure: config.NODE_ENV === 'production',
    })
    .redirect(`${config.FRONTEND_URL}/login`);
});

module.exports = router;
