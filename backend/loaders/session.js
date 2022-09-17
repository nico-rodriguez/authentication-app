const session = require('express-session');
const config = require('../config');

// Configuration of the store for the session of express-session
// Redis configuration and connection (only in development)
const RedisStore = require('connect-redis')(session);
const Redis = require('ioredis');

const redisClient = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
});

redisClient.on('error', (err) => {
  console.error('Redis client error');
  console.error(err);
  process.exit(1);
});

redisClient.on('connect', () => {
  console.log('Connected to session database!');
});

const sessionStore = new RedisStore({
  client: redisClient,
});

module.exports = session({
  name: 'sessionId',
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // Expires after 24h.
  // connect-redis prunes its entries by default according to this number.
  // See `ttl` option of the `RedisStore`: https://www.npmjs.com/package/connect-redis.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: 'none',
    secure: config.NODE_ENV === 'production',
  },
  store: sessionStore,
});
