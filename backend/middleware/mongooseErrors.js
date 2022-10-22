function mongooseErrorHandler(err, req, res, next) {
  const badRequestErrors = [
    'IncorrectPasswordError',
    'IncorrectUsernameError',
    'MissingUsernameError',
    'MissingPasswordError',
  ];
  const forbiddenErrors = ['UserExistsError', 'TooManyAttemptsError'];
  const tooManyRequestErrors = ['AttemptTooSoonError'];
  const databaseErrors = ['MongoServerError'];

  const isBadRequestError = badRequestErrors.includes(err.name);
  const isForbiddenError = forbiddenErrors.includes(err.name);
  const isTooManyRequestError = tooManyRequestErrors.includes(err.name);
  const isDatabaseError = databaseErrors.includes(err.name);

  if (isBadRequestError) {
    res.status(400);
    return res.json(err.message);
  }

  if (isForbiddenError) {
    res.status(403);

    if (err.name === 'UserExistsError') {
      return res.json('Username or password invalid');
    }

    return res.json(err.message);
  }

  if (isTooManyRequestError) {
    res.status(429);
    return res.json(err.message);
  }

  if (isDatabaseError) {
    if (err.message.includes('E11000 duplicate key error')) {
      res.status(400);
      return res.json('Username or password invalid');
    }
  }

  return next(err);
}

module.exports = mongooseErrorHandler;
