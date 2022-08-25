const session = require('express-session');
const config = require('../config');

// Configuration of the store for the session of express-session
let sessionStore;
if (config.NODE_ENV === 'development') {
  // Redis configuration and connection (only in development)
  const RedisStore = require('connect-redis')(session);
  const { createClient } = require('redis');
  const redisClient = createClient({ legacyMode: true });
  redisClient
    .connect()
    .then(() => {
      console.log('Connected to session database!');
    })
    .catch((err) => {
      console.error('Could not connect to session database.');
      console.error(err);
      process.exit(1);
    });
  sessionStore = new RedisStore({
    client: redisClient,
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  });
} else if (config.NODE_ENV === 'production') {
  const MemoryStore = require('memorystore')(session);
  // MemoryStore configuration
  sessionStore = new MemoryStore({
    checkPeriod: 1000 * 60 * 60 * 24, // prune expired entries every 24h
  });
} else {
  console.error(`Unhandled environment variable $NODE_ENV=${config.NODE_ENV}`);
}

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
    sameSite: 'strict',
    secure: config.NODE_ENV === 'production',
  },
  store: sessionStore,
});
