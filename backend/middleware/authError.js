const config = require('../config');
const CookieError = require('../errors/auth');

function authErrorHandler(err, req, res, next) {
  if (err instanceof CookieError) {
    res.status(401);
    return res
      .clearCookie('sessionId', config.COOKIE_SETTINGS)
      .json(err.message);
  }

  return next(err);
}

module.exports = authErrorHandler;
