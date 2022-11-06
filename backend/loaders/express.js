const authErrorHandler = require('../middleware/authError');
const defaultErrorHandler = require('../middleware/defaultError');
const mongooseErrorHandler = require('../middleware/mongooseErrors');
const multerErrorHandler = require('../middleware/multerErrors');
const passwordErrorHandler = require('../middleware/passwordErrors');
const { signupLimiter } = require('../middleware/rateLimit');
const userDataErrorHandler = require('../middleware/userDataError');

module.exports = (session) => {
  const express = require('express');
  require('express-async-errors');
  const compression = require('compression');
  const cors = require('cors');
  const helmet = require('helmet');
  const config = require('../config');

  const signupRouter = require('../api/v1/signup');
  const loginRouter = require('../api/v1/login');
  const logoutRouter = require('../api/v1/logout');
  const githubOAuthRouter = require('../api/v1/github');
  const googleOAuthRouter = require('../api/v1/google');
  const profileRouter = require('../api/v1/profile');

  const passport = require('../auth/passport');

  const app = express();

  // Apply middleware
  if (config.NODE_ENV === 'production') {
    const pino = require('pino-http')();
    app.use(pino);
  }

  if (config.NODE_ENV === 'production') {
    app.set('trust proxy', true);
  }

  app.use(
    cors({
      origin: config.FRONTEND_URL,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // allow session cookie from browser to pass through
    })
  );
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(compression());

  // Use routes
  const basePath = '/api/v1';

  app.use(`${basePath}/signup`, signupLimiter, signupRouter);
  app.use(`${basePath}/login`, loginRouter);
  app.use(`${basePath}/logout`, logoutRouter);

  // OAuth routes
  app.use(`${basePath}/auth/github`, githubOAuthRouter);
  app.use(`${basePath}/auth/google`, googleOAuthRouter);

  app.use(`${basePath}/profile`, profileRouter);

  app.use(authErrorHandler);
  app.use(mongooseErrorHandler);
  app.use(passwordErrorHandler);
  app.use(multerErrorHandler);
  app.use(userDataErrorHandler);
  app.use(defaultErrorHandler);

  // Start server
  app.listen(config.PORT, () =>
    console.log(`Listening on PORT ${config.PORT}!`)
  );
};
