// Connect to database
require('./loaders/mongoose.js');

// Connect to session database
const session = require('./loaders/session.js');

// Initialize the server
require('./loaders/express.js')(session);
