const UserDataError = require('../errors/user');

function userDataErrorHandler(err, req, res, next) {
  if (err instanceof UserDataError) {
    res.status(400);
    return res.json(err.message);
  }

  return next(err);
}

module.exports = userDataErrorHandler;
