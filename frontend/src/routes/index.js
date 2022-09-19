import { UserContext } from 'context/user';
import { useContext } from 'react';
import privateRoutes from './private';
import publicRoutes from './public';

import { useRoutes } from 'react-router-dom';
import authenticatingRoute from './authenticating';

export const AppRoutes = () => {
  const { isLoggedIn, isAuthenticating } = useContext(UserContext);

  const routes = isLoggedIn
    ? privateRoutes
    : isAuthenticating
    ? [...authenticatingRoute, ...publicRoutes]
    : publicRoutes;
  const element = useRoutes(routes);

  return <>{element}</>;
};
