function isUserAuth(err, req, res, next) {
  if (!req.user) {
    res.sendStatus(401);
  }

  next();
}

module.exports = isUserAuth;
