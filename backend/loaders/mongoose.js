const mongoose = require('mongoose');
const config = require('../config');

// Connect to database
mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log('Connected to users database!');
  })
  .catch((err) => {
    console.error('Could not connect to users database.');
    console.error(err);
    process.exit(1);
  });
