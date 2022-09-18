import constants from 'constants/index.js';
import storage from 'utils/storage';

const setUser = (user) => {
  storage.setToken(constants.USER_STORAGE_TOKEN, user);
};

const getUser = () => storage.getToken('user');

const isLoggedIn = () =>
  storage.getToken(constants.LOGGED_IN_STORAGE_KEY) ?? false;

const logIn = () => storage.setToken(constants.LOGGED_IN_STORAGE_KEY, true);

const userStorage = {
  setUser,
  getUser,
  isLoggedIn,
  logIn,
};

export default userStorage;
