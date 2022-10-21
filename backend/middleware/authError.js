const { config } = require('dotenv');
const CookieError = require('../errors/auth');

function authErrorHandler(err, req, res, next) {
  if (err instanceof CookieError) {
    res.status(401);
    return res
      .clearCookie('sessionId', {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: config.NODE_ENV === 'production' ? 'none' : 'strict',
        secure: config.NODE_ENV === 'production',
      })
      .json(err.message);
  }

  return next(err);
}

module.exports = authErrorHandler;
