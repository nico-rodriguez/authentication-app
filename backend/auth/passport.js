const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config');
const CookieError = require('../errors/auth');

const User = require('../models/User');

// Use mongoose local strategy
passport.use(User.createStrategy());

// GitHub OAuth strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: config.GITHUB_CLIENT_ID,
      clientSecret: config.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ githubId: profile.id });

        if (!user) {
          const newUser = await new User({
            githubId: profile._json.id,
            // If the GitHub profile doesn't have the following properties,
            // don't include them and instead use the model's defaults.
            ...(profile._json.avatar_url && {
              photo: profile._json.avatar_url,
            }),
            ...(profile._json.name && {
              name: profile._json.name,
            }),
            ...(profile._json.bio && {
              bio: profile._json.bio,
            }),
            ...(profile._json.email && {
              email: profile._json.email,
            }),
          }).save();

          return done(null, newUser);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const newUser = await new User({
            googleId: profile.id,
            // If the Google profile doesn't have the following properties,
            // don't include them and instead use the model's defaults
            ...(profile.displayName && {
              name: profile.displayName,
            }),
            ...(profile._json.email && {
              email: profile._json.email,
            }),
          }).save();
          return done(null, newUser);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// User serialization and deserialization for passport session
// Send the user's id in the session cookie
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// Get user data from it's id and attach it to req.user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    if (user) {
      done(null, user);
    } else {
      done(new CookieError('Unauthorized'));
    }
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
