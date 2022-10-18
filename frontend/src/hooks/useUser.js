import { UserContext } from 'context/user';
import { useContext } from 'react';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used inside a UserProvider');
  }

  return context;
};
