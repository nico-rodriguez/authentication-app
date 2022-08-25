const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: false,
    default: '',
  },
  googleId: {
    type: String,
    required: false,
    default: '',
  },
  photo: {
    type: String,
    required: false,
    default: '',
  },
  name: {
    type: String,
    required: false,
    default: '',
  },
  bio: {
    type: String,
    required: false,
    default: '',
  },
  phone: {
    type: String,
    required: false,
    default: '',
  },
});

// Add a username, hash and salt fields.
UserSchema.plugin(passportLocalMongoose, {
  // Complete list of options: https://github.com/saintedlama/passport-local-mongoose#main-options
  // Interval in milliseconds between login attempts (increases exponentially based on the number of failed attempts)
  interval: 100,
  // Maximum amount of time an account can be locked
  maxInterval: 1000 * 60 * 5,
  usernameField: 'email',
  usernameQueryFields: ['email'],
  usernameUnique: true,
  // Whether login attempts should be limited and login failures should be penalized
  limitAttempts: true,
  // Maximum number of failed attempts allowed before preventing login
  maxAttempts: 5,
  // Interval in milliseconds, which is for unlock user automatically after the interval is reached
  unlockInterval: 1000 * 60 * 5,
});

module.exports = mongoose.model('User', UserSchema);
