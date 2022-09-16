import Wrapper from 'components/Wrapper';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import { Navigate } from 'react-router-dom';

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
