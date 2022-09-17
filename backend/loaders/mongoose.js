const mongoose = require('mongoose');
const config = require('../config');

if (config.NODE_ENV === 'development') {
  const { MongoMemoryServer } = require('mongodb-memory-server');

  MongoMemoryServer.create().then((mongodb) => {
    const uri = mongodb.getUri();

    mongoose
      .connect(uri)
      .then(() => {
        console.log('Connected to users database!');
      })
      .catch((err) => {
        console.error('Could not connect to users database.');
        console.error(err);
        process.exit(1);
      });
  });
} else if (config.NODE_ENV === 'production') {
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
}
