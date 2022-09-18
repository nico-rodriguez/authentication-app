import { useEffect, useState } from 'react';
import userApi from 'api/users';
import storage from 'utils/storage';
import { UserContext } from 'context/user';
import userStorage from 'storage/users';

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => userStorage.getUserName());
  const [userPhoto, setUserPhoto] = useState(() => userStorage.getUserPhoto());
  const [isLoggedIn, setIsLoggedIn] = useState(() => userStorage.isLoggedIn());

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName(name) {
      userStorage.setUserName(name);
      setUserName(name);
    },
    userPhoto,
    setUserPhoto(photo) {
      userStorage.setUserPhoto(photo);
      setUserPhoto(photo);
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
