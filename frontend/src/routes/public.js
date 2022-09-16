import Wrapper from 'components/Wrapper';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Login = lazy(() => import('pages/Login'));
const Signup = lazy(() => import('pages/Signup'));

const publicRoutes = [
  {
    path: '/',
    element: <Navigate to='/signup' />,
  },
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/signup' />,
  },
];

export default publicRoutes;
