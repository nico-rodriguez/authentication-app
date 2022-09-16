import constants from 'constants/index.js';
import storage from 'utils/storage';

const setUserPhoto = (photoURL) => {
  storage.setToken(constants.USER_PHOTO_STORAGE_KEY, photoURL);
};

const getUserPhoto = () => storage.getToken(constants.USER_PHOTO_STORAGE_KEY);

const setUserName = (name) => {
  storage.setToken(constants.USER_NAME_STORAGE_KEY, name);
};

const getUserName = () => storage.getToken(constants.USER_NAME_STORAGE_KEY);

const isLoggedIn = () =>
  storage.getToken(constants.LOGGED_IN_STORAGE_KEY) ?? false;

const logIn = () => storage.setToken(constants.LOGGED_IN_STORAGE_KEY, true);

const userStorage = {
  setUserPhoto,
  getUserPhoto,
  setUserName,
  getUserName,
  isLoggedIn,
  logIn,
};

export default userStorage;
