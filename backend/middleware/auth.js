const config = require('../config');

function isUserAuth(req, res, next) {
  if (!req.user) {
    return res.redirect(401, `${config.FRONTEND_URL}/login`);
  }

  next();
}

module.exports = isUserAuth;
