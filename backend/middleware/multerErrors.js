const { MulterError } = require('multer');

function multerErrorHandler(err, req, res, next) {
  if (err instanceof MulterError) {
    res.status(400);
    return res.json(err.message);
  }

  return next(err);
}

module.exports = multerErrorHandler;
