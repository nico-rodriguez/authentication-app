const config = require('../config');

function isUserAuth(err, req, res, next) {
  if (!req.user) {
    res.redirect(401, `${config.FRONTEND_URL}/login`);
  }

  next();
}

module.exports = isUserAuth;
