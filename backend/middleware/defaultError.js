function defaultErrorHandler(err, req, res, next) {
  res.status(500);
  res.json('Unknown error. Try again');
}

module.exports = defaultErrorHandler;
