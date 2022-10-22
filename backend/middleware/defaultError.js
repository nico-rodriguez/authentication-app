function defaultErrorHandler(err, req, res) {
  res.status(500);
  res.json('Unknown error. Try again');
}

module.exports = defaultErrorHandler;
