const LOGGED_IN_STORAGE_KEY = 'logged_in';
const USER_STORAGE_TOKEN = 'user';
const AUTHENTICATING_STORAGE_KEY = 'authenticating';

const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://authentication-backend.onrender.com'
    : 'http://localhost:5000';

const constants = {
  LOGGED_IN_STORAGE_KEY,
  USER_STORAGE_TOKEN,
  AUTHENTICATING_STORAGE_KEY,
  BACKEND_URL,
};

export default constants;
