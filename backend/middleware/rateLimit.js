const rateLimit = require('express-rate-limit');

const ONE_HOUR = 60 * 60 * 1000;

const profileLimiter = rateLimit({
  windowMs: ONE_HOUR,
  max: 20, // Limit each IP to 20 /profile requests per `window` (here, per hour)
  message: 'Too requests from this IP, please try again after an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const signupLimiter = rateLimit({
  windowMs: ONE_HOUR,
  max: 6, // Limit each IP to 1 /signup requests per `window` (here, per hour)
  message: 'Too requests from this IP, please try again after an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { profileLimiter, signupLimiter };
