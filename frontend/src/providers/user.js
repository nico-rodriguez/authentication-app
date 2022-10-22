import { useEffect, useMemo, useState } from 'react';
import { UserContext } from 'context/user';
import userStorage from 'storage/users';
import { toast } from 'react-toastify';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => userStorage.getUser());
  const [isLoggedIn, setIsLoggedIn] = useState(() => userStorage.isLoggedIn());
  const [isAuthenticating, setAuthenticating] = useState(() =>
    userStorage.isAuthenticating()
  );

  useEffect(() => {
    const unsubscribe = toast.onChange((payload) => {
      if (
        payload.status === 'added' &&
        payload.type === toast.TYPE.ERROR &&
        payload.content.includes('Unauthorized')
      ) {
        setUser(null);
        setIsLoggedIn(false);
        setAuthenticating(false);
        userStorage.clear();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
