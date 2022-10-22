// Connect to database
require('./loaders/mongoose');

// Connect to session database
const session = require('./loaders/session');

// Initialize the server
require('./loaders/express')(session);
