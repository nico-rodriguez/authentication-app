import { createContext, useEffect, useState } from 'react';
import userService from 'services/user';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => userService.getUserName());
  const [userPhoto, setUserPhoto] = useState(() => userService.getUserPhoto());
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => window.sessionStorage.getItem('logged-in') ?? false
  );

  useEffect(() => {
    if (isLoggedIn) {
      window.sessionStorage.setItem('logged-in', true);
      userService.getProfile().then(({ name, photo }) => {
        setUserName(name);
        setUserPhoto(photo);
      });
    } else {
      window.sessionStorage.clear();
    }
    setIsLoggedIn(sessionStorage.getItem('logged-in') ?? false);
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
