const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const PasswordValidator = require('password-validator');

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
    default:
      'https://res.cloudinary.com/dnjnlemli/image/upload/v1662047796/profile-pictures/default.png',
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

const passwordSchema = new PasswordValidator();
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(40) // Maximum length 40
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digit
  .has()
  .not()
  .spaces(); // Should not have spaces

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
  passwordValidator(password, cb) {
    const passwordErrors = passwordSchema.validate(password, { list: true });
    const passwordHasErrors = passwordErrors.length > 0;

    if (passwordHasErrors) {
      const [passwordError] = passwordErrors;

      switch (passwordError) {
        case 'min':
          return cb({
            name: 'ShortPassword',
            message: 'Password must have at least 8 characters',
          });
        case 'max':
          return cb({
            name: 'LongPassword',
            message: 'Password must have at most 40 characters',
          });
        case 'uppercase':
          return cb({
            name: 'PasswordMissingUppercase',
            message: 'Password must have uppercase characters',
          });
        case 'lowercase':
          return cb({
            name: 'PasswordMissingLowercase',
            message: 'Password must have lowercase characters',
          });
        case 'digits':
          return cb({
            name: 'PasswordMissingDigits',
            message: 'Password must have digits',
          });
        case 'spaces':
          return cb({
            name: 'PasswordHasSpaces',
            message: 'Password must not have spaces',
          });
      }
    }

    return cb();
  },
});

module.exports = mongoose.model('User', UserSchema);
