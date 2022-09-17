const LOGGED_IN_STORAGE_KEY = 'logged_in';
const USER_PHOTO_STORAGE_KEY = 'user_photo';
const USER_NAME_STORAGE_KEY = 'user_name';

const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://authentication-backend.onrender.com'
    : 'http://localhost:5000';

const constants = {
  LOGGED_IN_STORAGE_KEY,
  USER_NAME_STORAGE_KEY,
  USER_PHOTO_STORAGE_KEY,
  BACKEND_URL,
};

export default constants;
