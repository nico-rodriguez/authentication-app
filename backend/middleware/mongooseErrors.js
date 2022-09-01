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
  } else if (isForbiddenError) {
    res.status(403);
    return res.json(err.message);
  } else if (isTooManyRequestError) {
    res.status(429);
    return res.json(err.message);
  } else if (isDatabaseError) {
    if (err.message.includes('E11000 duplicate key error')) {
      res.status(400);
      return res.json('Username already taken');
    }
  }

  next(err);
}

module.exports = mongooseErrorHandler;
