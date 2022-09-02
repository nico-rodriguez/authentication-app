import { createContext, useState } from 'react';
import userService from 'services/user';

function User() {
  let isLoggedIn = false;
  let userName = userService.getUserName();
  let userPhoto = userService.getUserPhoto();

  const setUserName = (name) => {
    userName = name;
    userService.saveUserName(name);
  };

  const setUserPhoto = (photo) => {
    userPhoto = photo;
    userService.saveUserPhoto(photo);
  };

  const setIsLoggedIn = (loggedIn) => {
    isLoggedIn = loggedIn;
  };

  return {
    isLoggedIn,
    userName,
    userPhoto,
    setUserName,
    setUserPhoto,
    setIsLoggedIn,
  };
}

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => userService.getUserName());
  const [userPhoto, setUserPhoto] = useState(() => userService.getUserPhoto());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = {
    isLoggedIn,
    userName,
    userPhoto,
    setUserName(name) {
      userService.saveUserName(name);
      setUserName(name);
    },
    setUserPhoto(photo) {
      userService.saveUserPhoto(photo);
      setUserPhoto(photo);
    },
    setIsLoggedIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
