import { useMemo, useState } from 'react';
import { UserContext } from 'context/user';
import userStorage from 'storage/users';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => userStorage.getUser());
  const [isLoggedIn, setIsLoggedIn] = useState(() => userStorage.isLoggedIn());
  const [isAuthenticating, setAuthenticating] = useState(() =>
    userStorage.isAuthenticating()
  );

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn(isLoggedIn) {
        userStorage.logIn();
        setIsLoggedIn(isLoggedIn);
      },
      user,
      setUser(user) {
        userStorage.setUser(user);
        setUser((contextUser) => Object.assign({ ...contextUser }, user));
      },
      isAuthenticating,
      setAuthenticating(isAuthenticating) {
        userStorage.setAuthenticating(isAuthenticating);
        setAuthenticating(isAuthenticating);
      },
    }),
    [isAuthenticating, isLoggedIn, user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
