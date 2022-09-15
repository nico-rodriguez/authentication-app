import { UserContext } from 'context/user';
import { useContext } from 'react';
import privateRoutes from './private';
import publicRoutes from './public';

const { useRoutes } = require('react-router-dom');

export const AppRoutes = () => {
  const { isLoggedIn } = useContext(UserContext);

  const routes = isLoggedIn ? privateRoutes : publicRoutes;
  const element = useRoutes(routes);

  return <>{element}</>;
};
