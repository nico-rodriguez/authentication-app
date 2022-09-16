import { useEffect, useState } from 'react';
import userService from 'services/user';
import storage from 'utils/storage';
import constants from 'constants/index.js';
import { UserContext } from 'context/user';

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => userService.getUserName());
  const [userPhoto, setUserPhoto] = useState(() => userService.getUserPhoto());
  const [isLoggedIn, setIsLoggedIn] = useState(
    storage.getToken(constants.LOGGED_IN_STORAGE_KEY) ?? false
  );

  useEffect(() => {
    if (isLoggedIn) {
      storage.setToken(constants.LOGGED_IN_STORAGE_KEY, true);
      userService.getProfile().then(({ name, photo }) => {
        setUserName(name);
        setUserPhoto(photo);
      });
    } else {
      storage.clear();
    }
    setIsLoggedIn(storage.getToken(constants.LOGGED_IN_STORAGE_KEY) ?? false);
  }, [isLoggedIn]);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName(name) {
      userService.saveUserName(name);
      setUserName(name);
    },
    userPhoto,
    setUserPhoto(photo) {
      userService.saveUserPhoto(photo);
      setUserPhoto(photo);
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
