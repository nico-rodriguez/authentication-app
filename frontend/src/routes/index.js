import privateRoutes from './private';
import publicRoutes from './public';

import { useRoutes } from 'react-router-dom';
import authenticatingRoute from './authenticating';
import { useUser } from 'hooks/useUser';

export const AppRoutes = () => {
  const { isLoggedIn, isAuthenticating } = useUser();

  const routes = isLoggedIn
    ? privateRoutes
    : isAuthenticating
    ? [...authenticatingRoute, ...publicRoutes]
    : publicRoutes;
  const element = useRoutes(routes);

  return <>{element}</>;
};
