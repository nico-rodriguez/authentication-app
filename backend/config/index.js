require('dotenv').config();

const PORT = process.env.PORT || 5000;
const { NODE_ENV } = process.env;

const { MONGODB_URL } = process.env;

// Redis configuration only needed in development mode
const { REDIS_HOST } = process.env;
const { REDIS_PORT } = process.env;

// Secret for signing the session cookie
const { SESSION_SECRET } = process.env;

// OAuth
// GitHub
const { GITHUB_CLIENT_ID } = process.env;
const { GITHUB_CLIENT_SECRET } = process.env;
// Google
const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;

const { FRONTEND_URL } = process.env;

const COOKIE_SETTINGS = {
  maxAge: 1000 * 60 * 60 * 24,
  sameSite: NODE_ENV === 'production' ? 'none' : 'strict',
  secure: NODE_ENV === 'production',
};

module.exports = {
  PORT,
  NODE_ENV,
  MONGODB_URL,
  REDIS_HOST,
  REDIS_PORT,
  SESSION_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FRONTEND_URL,
  COOKIE_SETTINGS,
};
