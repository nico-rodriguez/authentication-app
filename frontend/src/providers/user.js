import { useState } from 'react';
import { UserContext } from 'context/user';
import userStorage from 'storage/users';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    () =>
      userStorage.getUser() || {
        photo: '',
        name: '...',
        bio: '...',
        phone: '...',
        email: '...',
      }
  );
  const [isLoggedIn, setIsLoggedIn] = useState(() => userStorage.isLoggedIn());

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser(user) {
      userStorage.setUser(user);
      setUser((contextUser) => Object.assign({ ...contextUser }, user));
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
