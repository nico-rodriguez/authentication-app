function passwordErrorHandler(err, req, res, next) {
  const badRequestErrors = [
    'ShortPassword',
    'LongPassword',
    'PasswordMissingUppercase',
    'PasswordMissingLowercase',
    'PasswordMissingDigits',
    'PasswordHasSpaces',
  ];
  const isBadRequestError = badRequestErrors.includes(err.name);

  if (isBadRequestError) {
    res.status(400);
    return res.json(err.message);
  }

  return next(err);
}

module.exports = passwordErrorHandler;
